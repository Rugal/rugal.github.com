---
layout: post
title: "send email using Java"
description: ""
category: development
tags: [java]
date: 2014-01-18
---
It is said that we could conveniently sending email in Java. with the requirement of my project, I started to use it for my solution.  

## package requirement
sending email in Java needs two part of `jar`, First of it is the `JavaEE` declared API which do not includes implementation. Another part is provided by vendor, different web server may have disparate support.  
For me, `com.sun.mail` has rather enough function.  
In maven you need to add two `<dependency>`  
```xml
<dependency>
    <groupId>com.sun.mail</groupId>
    <artifactId>javax.mail</artifactId>
    <version>1.5.1</version>
    <scope>provided</scope>
</dependency>
<dependency>
    <groupId>javax.mail</groupId>
    <artifactId>javax.mail-api</artifactId>
    <version>1.5.1</version>
</dependency>
```
Please refer to [JavaMail API](https://java.net/projects/javamail/pages/Home) for further exploration.  

## coding
I want to implement the mailing function in a clear way, hence I separate it into three parts by `sender-info` `mail-info` and `mail-sending`.  
First part includes information about the sender, the procedure of sending email regularly needs a logined session from sender, which is similar to the procedure of logining `mail.google.com` by your `gmail` account.  
So you need to fill the account authentication in this class:  

```java
package rugal.mail.pojo;

/**
 *
 * @author Rugal Bernstein
 */
public class Sender
{

    private final String emailAddress;

    private String password;

    //simply resolve smtp host name by default, could manually change later
    private String smtpHostName;

    //default smtp port is 25, but some mail system will have different port
    private String smtpPort = "25";

    public String getEmailAddress()
    {
        return emailAddress;
    }

    public String getUsername()
    {
        return emailAddress.split("@")[0];
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public String getSmtpHostName()
    {
        return smtpHostName;
    }

    public void setSmtpHostName(String smtpHostName)
    {
        this.smtpHostName = smtpHostName;
    }

    public String getSmtpPort()
    {
        return smtpPort;
    }

    public void setSmtpPort(String smtpPort)
    {
        this.smtpPort = smtpPort;
    }

    public Sender(String emailAddress)
    {
        this.emailAddress = emailAddress;
        resolveSmtpHost();
    }

    private void resolveSmtpHost()
    {
        this.smtpHostName = "smtp." + this.emailAddress.split("@")[1];
    }
}
```

I think there is a very strange design in `javax.mail`, it needs to inherit `Authenticator` class to provide identity autorization, as below.  
I still could not figure out the reason, since this could be better designed.  

```java
package rugal.mail.pojo;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

/**
 *
 * @author Rugal Bernstein
 */
public class AccountAuthenticator extends Authenticator
{

    private String id = null;

    private String password = null;

    public AccountAuthenticator(String id, String password)
    {
        this.id = id;
        this.password = password;
    }

    @Override
    protected PasswordAuthentication getPasswordAuthentication()
    {
        return new PasswordAuthentication(id, password);
    }
}
```

And this is my mail information class that includes the recipient address and mail content.  
It will be very conveinent!

```java
package rugal.mail.pojo;

/**
 *
 * @author Rugal Bernstein
 */
public class Mail
{

    private final String recipient;

    private String subject;

    public String getRecipient()
    {
        return recipient;
    }

    private String content = "";

    public String getSubject()
    {
        return subject;
    }

    public void setSubject(String subject)
    {
        this.subject = subject;
    }

    public String getContent()
    {
        return content;
    }

    public void setContent(String content)
    {
        this.content = content;
    }

    public Mail(String recipient)
    {
        this.recipient = recipient;
    }

    public Mail(String recipient, String subject, String content)
    {
        this.recipient = recipient;
        this.subject = subject;
        this.content = content;
    }

}
```

And this is a service class that provide integrated function of sending mail.
```java
package rugal.mail.service;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.springframework.stereotype.Service;
import rugal.mail.pojo.AccountAuthenticator;
import rugal.mail.pojo.Mail;
import rugal.mail.pojo.Sender;

/**
 * This is a mail service provide mail sending function<BR/>
 * This class is designed as one to many mailing method<BR/>
 * you need to provide sender instance as constructor parameter<BR/>
 * then use <code>send</code> method to send mail
 *
 * @author Rugal Bernstein
 */
@Service
public class SendMailService
{

    private static final String mail_smtp_auth = "mail.smtp.auth";

    private static final String mail_smtp_starttls_enable = "mail.smtp.starttls.enable";

    private static final String mail_smtp_host = "mail.smtp.host";

    private static final String mail_smtp_port = "mail.smtp.port";

    private Session session;

    private final Sender sender;

    private final Properties properties = new Properties();

    public SendMailService(Sender sender)
    {
        this.sender = sender;
        properties.put(mail_smtp_starttls_enable, "true");
        properties.put(mail_smtp_auth, "true");
        properties.put(mail_smtp_host, sender.getSmtpHostName());
        properties.put(mail_smtp_port, sender.getSmtpPort());

    }

    public void send(Mail mail) throws MessagingException
    {
        if (null == session) {
            //need this authenticator class to specify authentication
            session = Session.getDefaultInstance(properties, 
                   new AccountAuthenticator(sender.getUsername(), sender.getPassword()));
        }
        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress(sender.getEmailAddress()));
        InternetAddress toAddress = new InternetAddress(mail.getRecipient());

        message.addRecipient(Message.RecipientType.TO, toAddress);

        message.setSubject(mail.getSubject());
        message.setText(mail.getContent());
        Transport.send(message);
    }
}
```
## test functionality
I like to use `JUnit` to do the unit test.

```java
package rugal.mail.service;

import javax.mail.MessagingException;
import org.junit.Before;
import org.junit.Test;
import rugal.mail.pojo.Mail;
import rugal.mail.pojo.Sender;

/**
 *
 * @author Rugal Bernstein
 */
public class SendMailServiceTest
{

    private Mail mail;

    private Sender sender;

    private SendMailService instance;

    @Before
    public void setUp()
    {
        mail = new Mail("example@web.com");
        mail.setContent("This is a test mail");
        mail.setSubject("This is a test subject");
        sender = new Sender("example@web.com");
        sender.setPassword("123456");
        instance = new SendMailService(sender);

    }

    /**
     * Test of send method, of class MailSender.
     *
     * @throws javax.mail.MessagingException
     */
    @Test
    public void testSend() throws MessagingException
    {
        System.out.println("begin");
        instance.send(mail);
        System.out.println("end");
    }
}
```
Seems everything is done!  
JavaMail API is pulchritude indeed!  

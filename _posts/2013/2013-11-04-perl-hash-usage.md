---
layout: post
title: "perl hash usage"
description: ""
category: development
tags: [perl]
---
{% include JB/setup %}
{%highlight perl%}
#  initialize %h as empty table
%h = {};  
  
#  initialize %h by a=>1, b=>2
%h = ('a', 1, 'b', 2);   # k,v,k,v ...
%h = ('a'=>1, 'b'=>2);   # the same as above line
%h = (a=>1, b=>2);       # quotation can be omitted if key is string
  

#  access by {}
print "$h{a}\n";

#  add entry
$h{b} = '2b';  
print "$h{b}\n"; 
  

#  delete key using delete
delete $h{b};     

#  clear hash table
undef %h


# get all keys, the order of keys depend on the hash function itself
@all_keys=keys %h
# sort by integer hash
@all_keys = sort{$h{$b}<=>$h{$a}} (keys %h)
# sort by string hash
@all_keys = sort{$h{$a} cmp $h{$b}} (keys %h)


# see if contain key
exists($h{$key});


# get size of hash table
$hash_size = keys %h # get hashsize
print scalar keys %h,"\n"    # print size of key


# retrieve hash
while (my ($k, $v) = each %h)
{
    print "$k ---> $v\n";
}   
foreach my $key (keys %$hostStatus)
{  
    print "The key is $key and value is $hostStatus->{$key}.";  
} 


# Reference is similar with C/C++ pointer
$h_ref = \%h;           # get hash reference
%aHash = %{$h_ref};     # just like dereference in C
$value = $h_ref->{akey};# similar with -> operator in C


# pass hash to function
%h = ();  
$h{a}=1;  
foo(\%h)  
print $h{b},"\n"; # print 2 fron foo()   

sub foo {  
    my ($h) = @_;  
    print $h->{a}, "\n"; # print 1
    $h->{b} = 2;  
}   
{%endhighlight%}

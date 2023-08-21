---
layout: post
title: "clojure state management introduction"
description: ""
category: development
tags: [clojure]
date: 2014-06-26
---

Before dive into those state management, let us first understand what are two key reference types are:  

## Coordination
1. `Coordinated` means different actors must work on the same workspace. Thus, they need to cooperate according to specific sequence in order to accomplish task.   
2. `Uncoordinated` in other hand, means different actors could work on their own workspace, without worrying about interfere others.   

## Synchronization
1. `Synchronous` operations involves some levels of lock or latch. The actor that owns the lock will block subsequent requirement.  
2. `Asynchronous` means different actors will no be blocked.  

-----------------

## 1. ref
`Ref` are Clojure’s implementation of `synchronous` and `coordinated` identities. Each is a distinct identity, but operations on them must be run inside a transaction, guaranteeing that multiple identities whose values depend on each other are always in a consistent state.   

```clojure
;definition and dereference:  
1. (ref 5)
2. (def my-ref (ref 5))
3. (deref my-ref) ; @my-ref
;transaction:  
4. (dosync (ref-set my-ref 6))
5. (dosync (alter my-ref + 3))

;sample
(def my-contacts (ref []))
(defn add-contact
    "adds a contact to the provided contact list"
    [contacts contact]
    (dosync
        (alter contacts conj (ref contact))))
(defn print-contacts
    "prints a list of contacts"
    [contacts]
    (doseq [c @contacts]
    (println (str "Name: " (@c :lname) ", " (@c :fname)))
    ))
(add-contact my-contacts {:fname "Luke" :lname "VanderHart"})
(add-contact my-contacts {:fname "Stuart" :lname "Sierra"})
(add-contact my-contacts {:fname "John" :lname "Doe"})
(print-contacts my-contacts)
```

## 2. atom
`Atom` are Clojure’s implementation of `synchronous`, `uncoordinated` identities. When updated then change is applied before proceeding with the current thread and the update occurs atomically. All future dereferences to the atom from all threads will resolve to the new value.

```clojure
1. (atom 5)
2. (def my-atom (atom 5))
3. @my-atom
4. (swap! my-atom + 3) ;alter alike
5. (reset! my-atom 1)  ;ref-set alike
```

One example of a case where atoms are very useful is for caching values. Cached values need to be accessible quickly, but are not dependent on the rest of the system’s state.

## 3. Asynchronous Agent
Like refs and atoms, `agent` are identities and adhere to Clojure’s philosophy of identity and state. Unlike refs and atoms, however, updates to their values occur asynchronously in a separate system managed thread pool dedicated to managing agent state.

```clojure
1. (agent 5)
2. (def my-agent (agent 5))
3. @my-agent
;Asynchronously operation
4. (send my-agent + 3)  ;performance better on CPU intensive action
5. (send-off my-agent + 3) ;performance better on IO intensive action
```


* Actions to any individual agent are applied serially, not concurrently. Multiple updates to the same agent won’t overwrite each other or encounter race conditions.    
* Multiple actions sent to an agent from the same thread will be applied in the order in which they were sent. Obviously, no such guarantees can be made about actions sent from different threads. 
* If an action function contains additional dispatches to agents, either to itself or other agents, dispatches are saved and are not actually called until after the action function returns and the agent’s value has been updated. This allows actions on an agent to trigger further actions without having the updates conflict.  
* If an update is dispatched to an agent within a STM transaction (for example, a dosync expression), the dispatch is not sent until the transaction is committed. This means that it is safe to dispatch updates to atoms from within STM transactions.


---------------

## Keeping Track of Identities
Both validator and watcher can do job on `ref` `agant` `atom`  
 
### Validators
validate variable data and throw exception while violated:  

```clojure
(set-validator! my-ref (fn [x] (< 0 x)))
(set-validator! my-agent (fn [x] (< 0 x)))
(set-validator! my-atom (fn [x] (< 0 x)))
(get-validator my-agent)
(set-validator! my-ref nil) ;remove validator
```

### Watches
Supervise variable data in any point:

```clojure
(defn my-watch [key identity old-val new-val]
    (println (str "Old: " old-val))
    (println (str "New: " new-val)))
(add-watch my-ref "watch1" my-watch)
(remove-watch my-ref "watch1")
```

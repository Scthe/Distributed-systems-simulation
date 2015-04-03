Distributed Systems Simulation
==============================

Simulation presenting message failures in distributed system.

## How to run

1. run `npm install`
2. run `bower install`
3. `grunt`
4. go to [http://localhost:9000/](http://localhost:9000/)

## Picture

![capture]
<br/>*Circles represent nodes with their's values shown, arrows represent messages send*

## What is this ?

#### How does it work

You've got a cluster of *n* nodes. We assume every node holds same data (system has single value with *n* replicas). There are 3 actions that can happen:

1. read request
1. update request
1. anti-entropy mechanism

When You **read** the value from the cluster only single number is returned. To do so, the read request is propagated among all cluster nodes and the best value is selected. In our example *best* means highest. What makes this simulation interesting is the fact that not all messages are received by recipients.

Similarly when **updating** (increasing) the value stored in node it *tries* to set the value to other nodes. Note that this behaviour is counter-intuitive - we can f.e. override value 10 with 7. This assumption makes simulation more graphical and approachable.

In distributed systems (especially databases) there are several **mechanism to ensure data consistency** f.e.
* **read-repair** - when we read value from several nodes we select the one that will be returned to client. Then  we resend the selected value to nodes from which we received original values. It's like: '*hey, I've seen the values that you'd send me and this is the best one. Use it from now on as your current value*'
* **anti-entropy** - from time to time node sends it's values ( actually hashes of this values to save bandwidth) to random node in the cluster. They are compared and updated if necessary.

Both mechanism are used in Dynamo based systems. It's is worth noting that they complement it self nicely: read-repair takes care of converging recent/hot values while if we have got some stale data it will be replicated through anti-entropy.

#### What happens when I click **x** ?

* slider **N** - number of nodes in cluster. Do not forget to click the *reload* button
* slider **Msg failure** - percentage of messages to fail
* **READ** button - read value from the cluster
* **ANTI-ENTROPY** button - free round of anti-entropy for everyone !
* **CLEAR** button - clear the arrows
* **click on the node** - increment value stored in the node

Read-repair is not implemented. It would require too much arrows.

## Used technology

- [d3]
- [bootstrap-material-design]
- [nouislider]
- [Jade]
- [SCSS]
- OOCSS
- [underscore]
- [jquery] 

[capture]:capture.gif
[bootstrap-material-design]:https://fezvrasta.github.io/bootstrap-material-design/
[underscore]:http://underscorejs.org/
[d3]:http://d3js.org/
[nouislider]:http://refreshless.com/nouislider/
[jquery]:https://jquery.com/
[SCSS]:http://sass-lang.com/
[Jade]:http://jade-lang.com/

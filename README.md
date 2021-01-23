### catbox

In this exercise, we simultaneously generate two entangled cats,
 "Cat One" and "Cat Two". One of the cats is alive (isAlive) (status 1)
  while the other deceased (status 0).

After the cats are created, the outcome for Cat One is revealed and then
the compiler makes guesses about the status of Cat Two until a period
 of time has elapsed.

The test is to observe if quantum entanglement will influence
the compiler's random generation function to guess in favor
of the actual outcome, since it is already known in the scope
by virtue of Cat One's status being revealed.

cat1 and cat2 are simultaneosly generated as a positive (alive)
and negative (dead) pair.

cat1 outcome is immediately observed.
cat2 outcome is observed only after some delay (eg. 30000 ms)

While cat2 is undefined, the generator randomly guesses its fate.

```
catbox node main.js
{ cat1: 1 }
{ cat2: -1 }

{ cat1: 1 }
{ cat2: 1 }

...

{ cat1: 1 }
{ cat2: -1 }

cat2 observed to be dead.
After 12 guesses,
Catbox thought: 58.33% chance it was dead

{ cat1: 1 }
{ cat2: -1 }

{ cat1: 1 }
{ cat2: -1 }
```

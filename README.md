### catbox

"See what is in the box."

A quick and dirty way to see if JavaScript's random generator
is affected by entanglement, retrocausation, and so on.

cat1 and cat2 are simultaneosly generated as a positive (alive)
and negative (dead) pair.

cat1 outcome is immediately observed.
cat2 outcome is observed only after some delay (eg. 30000 ms)

While cat2 is undefined, the generator randomly guesses its fate.

```
catbox  node main.js
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

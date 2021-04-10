### catbox

In this exercise, we simultaneously generate two entangled cats,
 "Cat One" and "Cat Two". One of the cats is alive (isAlive) (status 1)
  while the other deceased (status 0).

After the cats are created, the outcome for Cat One is revealed and then
the machine makes guesses about the status of Cat Two until a period
 of time has elapsed.

The test is to observe if quantum entanglement will influence
the machine's random generation function to guess in favor
of the actual outcome, since it is already known in the scope
by virtue of Cat One's status being revealed.


Sample Report:

-- Cats Report -------------

- Cat One is alive
- The Machine correctly predicted Cat Two is dead,
  picking alive 49.70% of the time.
- Cat Two is dead. Long live Cat Two.

-------------


## Installation

- git clone
- npm install

## Usage

- node catbox.js

## Test

- npm test

## Contributing

- Please feel free to submit a PR

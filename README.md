# Thue Typescript Implementation

  

## Intro 

This project is a command line based interpreter for the Thue programming language. According to wikipedia, Thue is a turing complete language first created by John Colagioia in early 2000. The language is based on string replacement via replacement rules. The original implementation was written in [C and is publically available on github here](https://github.com/jcolag/Thue/blob/master/thue.c).  This project implements the original behavior of John's, but with a few missing pieces:
<ul>
    <li>No ability to specify -d, -l or -r which enable debug and evaluation ordering</li>
    <li>No ability to use `:::` (tripple colon) to indicate input stream</li>
    <li> Probally some other edge cases</li>
</ul>

## How to use
<ol>
<li> Start by installing the dependencies using </li>
```
npm install
```
<li> Now, place your Thue program in a file of some kind and run the interpreter using 
```
ts-node main.ts {PATH_TO_FILE}
``` </li>
<li> Enjoy your results printed to the terminal </li>
</ol>
You can also run 
```
npm test
```
to execute the included tests

## Enjoy!
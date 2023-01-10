<!-- markdownlint-configure-file {
  "MD013": {
    "code_blocks": false,
    "tables": false
  },
  "MD033": false,
  "MD041": false
} -->

<div align="center">

# Get Employee Office Coincidence

A small program that tells how many employees go concurrently to the office<br />

[Description](#description) •
[Installation](#installation) •
[Building](#building) •
[Executing](#executing) •
[Execute Suite of Tests ](#execute-suite-of-tests)

</div>

<div align="center">


</div>



## Description
The solution is built with node/typescript. Is structured in the following manner:
![Screenshot 2023-01-05 at 11 43 20 AM](https://user-images.githubusercontent.com/101288216/210834008-c5e2db7e-7ba2-4b2e-8cbb-577cdd32ab38.png)
It has a quadratic solution that I'm, at the moment, working to improve. It uses Factory and Strategy Design principles.
I realized that the problem itself is maybe a quadratic solution wheater we like it or not, and that's why I didn't went to far. Anyway... in the real world, I think it would be more valuable to the business to have a LinkedList data structure like the one I proposed in the feature/... branch. In case the question is which are the busiest hours, the busiest days, etc...
<br/>

## Instructions 

### Installation

````sh
    $ npm install 
 ````  


### Building 

````sh
    $ npm run build
 ````  
### Executing  
***If wanted, the mock data available at src/\__mocks__/data/ could be used for testing manually.***
````sh
    node dist/index.js path-to-file/file/file-name.txt
 ````  
### Execute Suite of Tests 

````sh
    $ npm test
 ```` 



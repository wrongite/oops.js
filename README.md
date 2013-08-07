oops.js
=======

opps.js is a simple OOP library for Javascript.


Features
--------
  
  1. Derives methods and attributes from base class.
  1. Derives getter and setter from base class.
  1. Automatically added the method "__base__" point to the base class construtor.

Example
-------
    
    // Class Animal
    // Implement the constructor method of the class Animal
    function Animal() {
      console.log("Animal constructor is called");
    }
  
    // Assign attributes and methods to Animal
    Animal = Animal.Extend(Object, {
        _color: '',
        setColor: function(color) {
            this._color = color;
        },
        getColor: function() {
            return this._color;
        }
    });
    
    
    // Class Bird
    function Bird() {
        // Optional: call the base class constructor.
        // Please note that the __base__ is added to this object automatically.
        this.__base__();
        
        console.log("Bird constructor is called");
    }
    
    Bird = Bird.Extend(Animal, {
        fly: function() {
            // ....
        }
    });
    
    
    b = new Bird();
    b.setColor('red');  // Calling the inherited method.
    
    console.log(typeof b);
    console.log(b instanceof Bird);
    console.log(b instanceof Animal);
    
    
Output
------

    Animal constructor is called
    Bird constructor is called
    object
    true
    true

# Maximum Power Transfer Function documentation

 Here are all the functions used in Maximum Power Transfer experiment:
## These functions require no arguments
- createConnections( )

```This function is used to create connections using jsPlumb```


- checkConnections( ) 
```
This function is used to check if the connections are correct. (INCOMPLETE, FOR RAGHAV)
```

- disableConnections( ) 
```
This function is used to prevent the user from changing the connections.
```


- addValuesToTable( ) 
```
This function adds values to the table.
```
## These functions require arguments



- calcAmmeter(PS,R1,RL) 
```
This function calculates the Ammeter reading.
Required arguments:
PS - DOM Object of Power Supply Slider

R1 - DOM Object of R1 Slider  

RL - DOM Object of RL Slider
```
> Note: to get the DOM object use:
PS = document.getElementById("ID_OF_SLIDER")

`Returns: Ammeter Reading in Float.`



- calcVoltmeter(PS,R1,RL) 
```
This function calculates the Voltmeter reading.

Required arguments:
Same as calcAmmeter
```
`Returns: Ammeter Reading in Float.`




- updateAmmeter(AMMETER_VAR) 

```This function updates the angle in Ammeter. It is passed the value of current (from calcAmmeter( ) function)
TODO-RAGHAV
```


- updateVoltmeter(VOLTMETER_VAR) 
```
Similar to updateAmmeter( ) except this is for Voltmeter.
```
TODO-RAGHAV

<span style="color: red;">IMPORTANT: EVERYTHING MARKED: TODO-RAGHAV IS INCOMPLETE. PLEASE COMPLETE IT</span>


# DOM Variable Names Visualised

!["test"](https://i.imgur.com/b7wfoUU.png "All of the names are self explanatory for human understanding. Kindly use them to the fullest")

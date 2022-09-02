#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=periodic_table --tuples-only -c"
MAIN() {
  if [[ -z $1 ]]; then
    echo "Please provide an element as an argument."
    exit
  fi
  #checks if it is a letter or number, and tries to find element based on that
  if [[ $1 =~ ^[a-zA-Z]+$ ]]; then
    ELEMENT=$($PSQL "SELECT (atomic_number, symbol, name, type, atomic_mass, melting_point_celsius, boiling_point_celsius) FROM elements INNER JOIN properties USING(atomic_number) INNER JOIN types USING(type_id) WHERE name = '$1' OR symbol = '$1';")
  else
    ELEMENT=$($PSQL "SELECT (atomic_number, symbol, name, type, atomic_mass, melting_point_celsius, boiling_point_celsius) FROM elements INNER JOIN properties USING(atomic_number) INNER JOIN types USING(type_id) WHERE atomic_number = $1;")
  fi
  # if can't find an element
  if [[ -z $ELEMENT ]]; then
    echo "I could not find that element in the database."
    exit
  fi
  #if element is found create variables
  echo $ELEMENT | sed -E 's/^\(|\)$|//g' | while IFS=',' read ATOMIC_NUMBER SYMBOL NAME TYPE ATOMIC_MASS MELTING_POINT BOILING_POINT
  do # and print organized information
    echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
  done  
}
MAIN $1
exit
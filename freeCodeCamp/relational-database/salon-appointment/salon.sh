#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=salon --tuples-only -c"
echo -e "\n ~~ Salon ~~\n"
SERVICES=$($PSQL "SELECT * FROM services;")
MAIN() {
  if [[ $1 ]]; then #Checks if returns to main menu with any warnings
    echo -e "\n$1"
  fi
  echo -e "\nServices Menu\n"
  echo "$SERVICES" | while read ID BAR SERVICE_NAME; do
    echo "$ID) $SERVICE_NAME"
  done
  echo -e "\nPlease choose your desired service's number:"
  read SERVICE_ID_SELECTED
  if [[ ! $SERVICE_ID_SELECTED =~ ^[1-3]$ ]]; then
    MAIN "Please insert a valid service number"
  fi
  echo -e "\nPlease inform your telephone number:"
  read CUSTOMER_PHONE
  CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE';")
  if [[ -z $CUSTOMER_NAME ]]; then
    echo -e "\nLooks like you are a first time customer, please inform your name:"
    read CUSTOMER_NAME
    REGISTER_CUSTOMER=$($PSQL "INSERT INTO customers (phone, name) VALUES ('$CUSTOMER_PHONE', '$CUSTOMER_NAME');")
    echo -e "\nNow you are on our clients list, thank you :)"
  fi
  echo -e "\n Please insert your desired appointment date and time"
  read SERVICE_TIME
  echo name: $CUSTOMER_NAME
  echo phone: $CUSTOMER_PHONE
  echo appointment: $SERVICE_TIME
  CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE name = '$CUSTOMER_NAME' AND phone = '$CUSTOMER_PHONE';")
  CREATE_APPOINTMENT=$($PSQL "INSERT INTO appointments (customer_id, service_id, time) VALUES ($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME');")
  S_NAME=$($PSQL "SELECT name FROM services WHERE service_id = $SERVICE_ID_SELECTED;")
  echo "I have put you down for a $S_NAME at $SERVICE_TIME, $CUSTOMER_NAME."
  exit
}
MAIN
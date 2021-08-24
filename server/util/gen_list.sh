#!/bin/bash

# create a backup copy of the source just in case
cp ./corpus/hemingway.txt ./corpus/bak_hemingway.txt

first_line=82
last_line=2911


# - extracts the body of work by excluding intro, credits etc
# - convert That's and Don't to Thats and Dont
# - convert to lowercase
# - remove whitespaces
# - remove punctuation, quotes and emphasis characters (_)
# - separates hypenated words into individual words
# - puts each word on a new line
# - sorts
# - removes duplicates and blank lines

sed -n "${first_line},${last_line}p" ./corpus/bak_hemingway.txt > ./corpus/trimmed_hemmingway.txt

cat ./corpus/trimmed_hemmingway.txt | \
  tr '[:upper:]' '[:lower:]' | \
  tr -d "." | \
  tr -d '"' | \
  tr -d "'" | \
  tr -d "," | \
  tr -d "?" | \
  tr -d ";" | \
  tr -d ":" | \
  tr -d "_" | \
  tr "-" " " | \
  tr -d '\r' | \
  tr ' ' '\n' | \
  sort | uniq | sed '/^$/d' > ./corpus/sorted_word_list.txt
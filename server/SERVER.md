## Populate Data

### SQL `util/init.sql`

I decided to offload the search to the `pg_trgm` postgres extension

We created a corpus table to allow for other works

Search Table has columns `word` and `corpus_id`

`word` is unique

There is a gist index on word using `pg_trgm`

### Utility Scripts

From server folder: `./util/gen_list.sh && node util/populate.js`

  - gen_list.sh: generates a unique word list one word per line
  - populate.js: inserts into the database


### SQL trigram search example

#### Example query

```
   select word, similarity(word, 'you') as sml 
     from search
    where word % 'you'
      and corpus_id=1
 order by sml DESC, word
    limit 3;
```

--    word   |    sml     
-- ----------+------------
--  you      |          1
--  your     |        0.5
--  youll    | 0.42857143
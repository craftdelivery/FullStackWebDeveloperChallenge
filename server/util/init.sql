create table corpus (
  id serial primary key,
  author text,
  title text
);

insert into corpus(author, title) values ('Ernest Hemingway', 'The Old Man and The Sea');

-- we will use a const in the js
-- HEMINGWAY_CORPUS_ID = 1 

create table search (
  id serial primary key,
  word text unique,
  corpus_id int references corpus(id)
);

create index search_idx on search using gist(word gist_trgm_ops);

-- Example query
--   select word, similarity(word, 'you') as sml 
--     from search
--    where word % 'you'
--      and corpus_id=1
-- order by sml DESC, word
--    limit 3;

--    word   |    sml     
-- ----------+------------
--  you      |          1
--  your     |        0.5
--  youll    | 0.42857143


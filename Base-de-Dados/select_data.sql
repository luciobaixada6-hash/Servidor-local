SELECT * FROM tbl_utilizadores;

SELECT id, nome FROM tbl_utilizadores;

SELECT  tbl_utilizadores.id, tbl_prestador.id FROM tbl_utilizadores, tbl_prestador;

SELECT
table_orcamento.id,
total,
tbl_utilizadores.id,
nome
FROM
table_orcamento,
tbl_utilizadores
WHERE
table_orcamento.id_utilizadores = "b266d177-6d6f-4faf-a428-cd45714b1cd6";

SELECT * FROM tbl_servicos;

SELECT * 
FROM tbl_utilizadores 
WHERE tbl_utilizadores.id = "b266d177-6d6f-4faf-a428-cd45714b1cd6";

SELECT * FROM tbl_prestador WHERE tbl_prestador.nif = "1335557"
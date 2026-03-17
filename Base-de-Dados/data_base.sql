INSERT INTO tbl_utilizadores (id, nome, nome_identifica, data_nascimento, email, telefone, pais, localidade, ´password´, enabled, created_at, update_at)
VALUES(
"b266d177-6d6f-4faf-a428-cd45714b1cd6",
"Lúcio santos",
"l2002",
"2002-10-06",
"lucio.baixada6@gmail.com",
"9717445",
"Cabo verde",
"Ponta d Agua",
"$2a$12$hyZZ3WYbNXe0GZXf8Kv6jOd.DKlHLNSw2aTd3YgY3hAaQjy65IKIq",
true,
NOW(),
NOW()
);

INSERT INTO table_orcamento
VALUES (
NULL,
500,
"b266d177-6d6f-4faf-a428-cd45714b1cd6",
true,
NOW(),
NOW()
);

INSERT INTO tbl_servicos
VALUE(
NULL,
"contabilidade",
"Realizar contabilidade em pequenas e grandes empresas",
"contabilidade ",
true,
NOW(),
NOW()
);

INSERT INTO tbl_prestador
VALUE(
"26bba2f6-7db9-4949-8223-b294170a9bbb",
1335557,
"contabelista",
0.4,
2000,
0.1,
true,
true,
NOW(),
NOW()
);

INSERT INTO tbl_prestadores_servico
value (
NULL,
"formacao superior em contabilidade",
3000,
7,
"26bba2f6-7db9-4949-8223-b294170a9bbb",
2,
10,
"pendente",
1,
true,
NOW(),
NOW()
);

INSERT INTO tbl_utilizadores
VALUES(
"353d5352-71db-40b9-89d7-87a53c163a",
"Lúcio santos",
"D1999",
"2002-10-06"
"lucio.baixada6@gmail.com",
"9717445",
"Cabo verde",
"Ponta d Agua",
"$2a$12$IR7QwtxBSyULlZLa5eV1iObv7M8lI1WALA.wNQzlOXC04tOryJ/0C",
true,
NOW(),
NOW()
);

USE servidor_local;

CREATE TABLE IF NOT EXISTS `tbl_empresas` (
	`id` VARCHAR(255) NOT NULL UNIQUE,
	`designacao` VARCHAR(100) NOT NULL,
	`descricao` TEXT,
	`localizacao` VARCHAR(255) NOT NULL,
	`nif` VARCHAR(20) NOT NULL,
	`icone` VARCHAR(255),
	`id_utilizador` VARCHAR(255) NOT NULL,
	`enabled` BOOLEAN NOT NULL DEFAULT TRUE,
	`created_at` DATETIME NOT NULL,
	`updated_at` DATETIME NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY (`id_utilizador`) REFERENCES `tbl_utilizadores`(`id`)
);
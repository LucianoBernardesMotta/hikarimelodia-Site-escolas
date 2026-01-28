CREATE TABLE `alunos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matricula` varchar(20) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`dataNascimento` timestamp,
	`turmaId` int,
	`foto` text,
	`notas` json,
	`frequencia` int DEFAULT 100,
	`diasAusentes` int DEFAULT 0,
	`atividadesPendentes` json,
	`documentos` json,
	`alergias` json,
	`medicamentosAutorizados` json,
	`contatosMedicos` json,
	`contatosEmergencia` json,
	`ativo` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `alunos_id` PRIMARY KEY(`id`),
	CONSTRAINT `alunos_matricula_unique` UNIQUE(`matricula`)
);
--> statement-breakpoint
CREATE TABLE `arquivos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nomeOriginal` varchar(255) NOT NULL,
	`nomeArmazenado` varchar(255) NOT NULL,
	`mimeType` varchar(100) NOT NULL,
	`tamanho` int NOT NULL,
	`url` text NOT NULL,
	`enviadoPor` varchar(320) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `arquivos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dia_dia` (
	`id` int AUTO_INCREMENT NOT NULL,
	`data` timestamp NOT NULL,
	`tipo` enum('cardapio','transporte','atividade','material','bem_estar') NOT NULL,
	`turmaId` int,
	`alunoId` int,
	`cardapio` json,
	`transporte` json,
	`descricao` text,
	`itens` json,
	`bemEstar` json,
	`postadoPor` varchar(320),
	`ativo` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `dia_dia_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `equipe` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`cargo` enum('diretor','coordenador','professor','cantina','transporte','secretaria','financeiro') NOT NULL,
	`turmas` json,
	`telefone` varchar(20),
	`foto` text,
	`ativo` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `equipe_id` PRIMARY KEY(`id`),
	CONSTRAINT `equipe_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `mensagens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`alunoMatricula` varchar(20),
	`remetente` varchar(320) NOT NULL,
	`remetenteNome` varchar(255),
	`remetenteTipo` enum('responsavel','equipe') NOT NULL,
	`destinatario` varchar(320) NOT NULL,
	`destinatarioSetor` enum('professor','coordenacao','direcao','transporte','cantina','financeiro','secretaria'),
	`texto` text NOT NULL,
	`anexoUrl` text,
	`anexoTipo` varchar(50),
	`lido` boolean NOT NULL DEFAULT false,
	`lidoEm` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mensagens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mural` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tipo` enum('noticia','evento','foto','video','depoimento') NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`conteudo` text,
	`urlMidia` text,
	`dataEvento` timestamp,
	`postadoPor` varchar(320) NOT NULL,
	`visibilidade` enum('todos','turma') NOT NULL DEFAULT 'todos',
	`turmasCodigo` json,
	`expiracaoEm` timestamp,
	`ativo` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mural_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `responsaveis` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`telefone` varchar(20),
	`parentesco` varchar(50),
	`filhos` json,
	`contatosEmergencia` json,
	`ativo` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `responsaveis_id` PRIMARY KEY(`id`),
	CONSTRAINT `responsaveis_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `turmas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`codigo` varchar(10) NOT NULL,
	`serie` varchar(50) NOT NULL,
	`nivel` enum('creche','educacao_infantil','fundamental','medio') NOT NULL,
	`professorTitularId` int,
	`ativo` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `turmas_id` PRIMARY KEY(`id`),
	CONSTRAINT `turmas_codigo_unique` UNIQUE(`codigo`)
);

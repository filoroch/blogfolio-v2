---
title: Construindo meu primeiro blog
slug: construindo-meu-primeiro-blog
description: como eu desenhei a arquitetura do meu blog para me dar a liberdade de escrever no notion e publicar estaticamente e com a estilização que eu queria no angular
publishedAt: 2026-10-03
categories: [tecnology, architecture, blog]
---

Construir esse blog era um objetivo de longa data. Quando comecei a estudar Angular como parte do meu novo trabalho, pensei em varios projetos para consolidar meus conhecimentos na Stack e acabei finalmente começando pelo mais simples e oque tem mais relevancia pra mim: um blogfolio

## A ideia
O blogfolio é basicamente um portfolio + blog que contem tanto minhas experiencias, projetos e conteudos compartilhados, criando o meu pequeno espaço na web. A sacada aqui era lidar com uma dor antiga que era centralizar minhas ideias e meu espaço de discursão em um lugar publico e que acima de tudo, pudesse ser facilmente compartilhado, como referencia para meus amigos, como forma de ser criticado por erros tambem.

## A dor
Apesar de ser fã do markdown, eu não queria ter que abri o vscode para cada novo post, uma vez que eu ja tenho uma rotina muito consolidada no notion de escrita e de tomada de notas, ideias e etc. dai eu pensei

> E se ao inves de usar as tecnologias padrão para criação de blog (astro, html puro, CMS) eu simplesmente desenvolvesse uma solução que me atendesse na stack que eu ja to trablhando?

 Isso se deve puramente por uma questão de conforto e não de ser mais simples ou glamoroso de implementar. Como tudo na tecnologia, oque define a adesão é justamente como aquilo resolve a sua dor, é nesse caso, a minha se resolveu assim:

 ## O projeto (bom, rascunho)
 - Um frontendo angular com analog.js (SSG) servido na vercel, recebendo markdown estaticamente e servindo no proximo build
 - Um notion contendo meus conteudos escritos, controlados em datasources com flags e automatizados via webhook
 - Github Actions pegando o markdown do notion, subindo como novo commit na pasta de content, ja com o frontmatter configurado
- Vercel realizando um novo deploy
- Mongodb Atlas para trazer os comentarios

Parece ate meio exagerado, mas é a solução que ficou ideal para mim

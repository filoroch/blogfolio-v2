# Blogfolio
My personal blog and portfolio 

## Archictecture proposal
<img width="1200" height="838" alt="image" src="https://github.com/user-attachments/assets/9123a3e9-28eb-4729-b52a-244746f2d8b3" />

---

- conteúdo é registrado num datasource notion
- conteudo é atualizado para publicado / published
- gh actions busca todos os posts alterados desde o ultimo commit
- transforma em mardown + frontmatter
- sobe como um novo markdown no repositorio
- build é gerado (vercel / gh pages)
- novo post fica disponivel

# Open questions"
- Resolver oque acontece caso eu prive uma postagem no notion
- A geração automatizada de slugs
- Geração e controle dos comentarios

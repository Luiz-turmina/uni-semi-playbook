# Playbook SDR · Unidas Seminovos

Site estático (HTML + CSS + JS, sem build) para as SDRs estudarem. Senha de acesso: **BluUnidas** (hash em `index.html`, `window.USP_HASH`; barreira no navegador, não proteção de servidor).

## Rodar localmente
```bash
python3 -m http.server 8747
```

## Onde mudar as coisas
- `data.js` e `data2.js`: TODO o conteúdo (data2 = partes, trilhas, casos, funil, rituais, onboarding). No topo, `regras` (comissão R$ 60, CPVR máx. R$ 200, cortes das bandeiras 200/300/400, aumento de R$ 500 a cada 3 meses verdes, prazo de 5 min, anti no-show).
- `prints: []` em `data.js`: quando tiver prints reais, salve como `print-ficha-1.png`, `print-blip-3.png`, `print-ligacao-2.png` (um por passo), na raiz, e liste os nomes ali.
- `styles.css` (visual), `app.js` (montagem e interações), `gate.js` (senha).
- Logos: `logo-unidas-seminovos.png` (vermelha), `-branco.png`, `logo-unidas-quadrada.png`, `logo-unidas-aluguel-branco.png`.

## Publicar
Suba **todos os arquivos na raiz** do repositório (sem subpastas) e importe na Vercel (Framework: Other, sem build).
Arquivos: `index.html`, `styles.css`, `app.js`, `data.js`, `data2.js`, `gate.js` e os 4 PNGs de logo.

## Fontes do conteúdo
Site oficial seminovos.unidas.com.br (25/11/2026), apresentação institucional Unidas 2026, reuniões e treinamentos com a Unidas, sistema de bandeiras BLU.

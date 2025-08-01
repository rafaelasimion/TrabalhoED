document.addEventListener("DOMContentLoaded", function () {

    // opção 1 ------------------------------------------

    const dados = [];
    const opcao1 = document.getElementById("op1");

    function btn01() {
        opcao1.style.display = 'flex';
        opcao1.style.justifyContent = 'center';
        opcao2.style.display = 'none';
        opcao3.style.display = 'none';
        opcao4.style.display = "none";
    }

    function realizarCad() {
            
        if (dados.length >= 10) {
            alert("Limite máximo de 10 alunos atingido.");
            return;
        }

        let nome_al = document.getElementById("nome_txt").value
        let ra_al = document.getElementById("ra_txt").value.trim()
        let idade_al = document.getElementById("idade_txt").value.trim()
        let media_al = document.getElementById('media_txt').value.trim()
        let sexo_al = document.querySelector('input[name="sexo"]:checked')?.value;
        let resultado_al

        // validação dos dados

        if (!nome_al) {
            alert("Por favor, preencha o nome.");
            return;
        }
    
        if (!/^\d{13}$/.test(ra_al)) {
            alert("O RA deve conter exatamente 13 números.");
            return;
        }
    
        if (!idade_al || isNaN(idade_al)) {
            alert("Por favor, insira uma idade válida.");
            return;
        }
    
        let mediaNum = parseFloat(media_al);
        if (isNaN(mediaNum) || mediaNum < 0 || mediaNum > 10) {
            alert("A média deve ser um número entre 0 e 10.");
            return;
        }
    
        if (!sexo_al) {
            alert("Por favor, selecione o sexo.");
            return;
        }

        sexo_al = (sexo_al === 'feminino') ? 'Feminino' : 'Masculino';

        if (mediaNum >= 6) {
            resultado_al = 'APROVADO'
        }else{
            resultado_al = 'REPROVADO'
        }

        // armazenando dados do aluno

        const aluno = {
            nome: nome_al,
            ra: ra_al,
            idade: parseInt(idade_al),
            sexo: sexo_al,
            media: mediaNum,
            resultado: resultado_al
        }

        dados.push(aluno)

        alert('Aluno cadastrado com Sucesso!')
        
        // Limpar os campos
        document.getElementById("nome_txt").value = "";
        document.getElementById("ra_txt").value = "";
        document.getElementById("idade_txt").value = "";
        document.getElementById("media_txt").value = "";
        document.querySelectorAll('input[name="sexo"]').forEach(radio => radio.checked = false);
    }

    // opção 2 ------------------------------------------

    let opcao2 = document.getElementById('op2')

    function btn02() {
        opcao1.style.display = 'none';
        opcao2.style.display = 'flex';
        opcao3.style.display = 'none';
        opcao4.style.display = "none";
        selsortNomes(dados);
        mostrarTabela(dados, "op2");
    }

    // ordenando por nomes

    function selsortNomes(vetor) {
        for (let pSel = 0; pSel < vetor.length - 1; pSel++) {
            let pMenor = pSel + 1;
    
            for (let i = pMenor + 1; i < vetor.length; i++) {
                if (vetor[i].nome.localeCompare(vetor[pMenor].nome) < 0) {
                    pMenor = i;
                }
            }
    
            if (vetor[pSel].nome.localeCompare(vetor[pMenor].nome) > 0) {
                [vetor[pSel], vetor[pMenor]] = [vetor[pMenor], vetor[pSel]];
            }
        }
    }

    selsortNomes(dados)
    
    function mostrarTabela(lista, elementoId) {

        if (lista.length === 0) {
            alert('Nenhum aluno cadastrado!')
        }

        let tabela = `
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>RA</th>
                    <th>Idade</th>
                    <th>Sexo</th>
                    <th>Média</th>
                    <th>Resultado</th>
                </tr>
            </thead>
            <tbody>
        `;

        lista.forEach(aluno => {
            tabela += `
                <tr>
                    <td>${aluno.nome}</td>
                    <td>${aluno.ra}</td>
                    <td>${aluno.idade}</td>
                    <td>${aluno.sexo}</td>
                    <td>${aluno.media}</td>
                    <td>${aluno.resultado}</td>
                </tr>
            `;
        });

        tabela += `
                </tbody>
            </table>
        `;

        document.getElementById(elementoId).innerHTML = tabela;
    }

    // opção 3 ------------------------------------------

    let opcao3 = document.getElementById('op3')

    function btn03() {
        opcao1.style.display = 'none';
        opcao2.style.display = 'none';
        opcao3.style.display = "flex";
        opcao4.style.display = "none";
        
        bbsortRa(dados);
        mostrarTabela(dados, "op3");
    }

    function bbsortRa(vetor) {
        let trocou;
    
        do {
            trocou = false;
    
            for (let i = 0; i < vetor.length - 1; i++) {
                if (Number(vetor[i].ra) < Number(vetor[i + 1].ra)) {
                    // Troca de posição
                    [vetor[i], vetor[i + 1]] = [vetor[i + 1], vetor[i]];
                    trocou = true;
                }
            }
        } while (trocou);
    }

    // opção 4 ------------------------------------------

    let opcao4 = document.getElementById('op4')

    function btn04() {
        
        opcao1.style.display = "none";
        opcao2.style.display = "none";
        opcao3.style.display = "none";
        opcao4.style.display = "flex";

        let aprovados = dados.filter(aluno => aluno.resultado === 'APROVADO');

        if (aprovados.length === 0) {
            alert("Não há alunos aprovados!");
        }

        selsortNomes(aprovados)
        mostrarTabela(aprovados, "op4");
    }

    // opção 5 ------------------------------------------

    function btn05() {
        alert('Programa encerrado!')
        location.reload();
    }

    // acesso funções

    window.btn01 = btn01;
    window.realizarCad = realizarCad; 
    window.btn02 = btn02;
    window.selsortNomes = selsortNomes;
    window.mostrarTabela = mostrarTabela;
    window.btn03 = btn03;
    window.bbsortRa = bbsortRa;
    window.btn04 = btn04;
    window.btn05 = btn05;
});
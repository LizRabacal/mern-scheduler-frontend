import React from 'react';

const Functions = () => {
    const corAleatoria = () => {
        const cores = ["#BBE589", "#58B1E0", "#E688A3", "#58E088", "#5885E0", "#E0D146", "#E34610", "#E3A810", "#E69970", "#91E53F"];
        const indiceAleatorio = Math.floor(Math.random() * cores.length);
        return cores[indiceAleatorio];
    };

    const formatarData = (inicio, fim) => {
        const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

        const inicioDiaSemana = diasDaSemana[inicio.getDay()];
        const inicioDia = inicio.getDate();
        const inicioMes = meses[inicio.getMonth()];
        const ano = inicio.getFullYear();

        const inicioHora = inicio.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const fimHora = fim.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        if (inicio.toDateString() === fim.toDateString()) {
            return `${inicioDiaSemana}, ${inicioDia} de ${inicioMes} de ${ano} \n
             (${inicioHora} - ${fimHora})`;
        } else {
            const fimDiaSemana = diasDaSemana[fim.getDay()];
            const fimDia = fim.getDate();
            const fimMes = meses[fim.getMonth()];

            return `${inicioDiaSemana}, ${inicioDia} de ${inicioMes} de ${ano} \n ${inicioHora} - ${fimDiaSemana}, ${fimDia} de ${fimMes} de ${ano}, ${fimHora}`;
        }
    };

    return {
        corAleatoria,
        formatarData
    };
};

export default Functions;

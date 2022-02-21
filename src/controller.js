const fs = require('fs');
const path = require('path');

const cpfPath = path.join(__dirname + '/../public/data/CPF.txt');
const cnpjPath = path.join(__dirname + '/../public/data/CNPJ.txt');

let cpf_data = [];
let cnpj_data = [];

module.exports = {
    init_cpf_data: () => {
        fs.readFile(cpfPath, (err, data) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    console.log(cpfPath);
                    fs.openSync(cpfPath, 'w'); return;
                } else {
                    throw err;
                }
            }
            if (data != '') {
                cpf_data = data.toString().split('\n').map(item => {
                    return item.split('|');
                });
            }
        });
    },

    init_cnpj_data: () => {
        fs.readFile(cnpjPath, (err, data) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    fs.openSync(cnpjPath, 'w'); return;
                } else {
                    throw err;
                }
            }
            if (data != '') {
                cnpj_data = data.toString().split('\n').map(item => {
                    return item.split('|');
                });
            }
        });
    },

    get_cpfs: (req, res) => {
        const { cpf, birth } = req.body;

        let data = cpf_data.filter(item => {
            if (item[0] == cpf && item[1].includes(birth)) {
                return item;
            }
        });
        
        res.render('result', { result: data, cpf: cpf, birth: birth, type: 'cpf' });
    },

    get_cnpjs: (req, res) => {
        const { cnpj, openDate } = req.body;

        let data = cnpj_data.filter(item => {
            if (item[0] == cnpj && item[1].includes(openDate)) {
                return item;
            }
        });
        
        res.render('result', { result: data, cnpj: cnpj, openDate: openDate, type: 'cnpj' });
    }
}
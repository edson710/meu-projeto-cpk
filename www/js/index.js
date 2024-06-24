/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

fetch('js/backend.json')
    .then(response => response.json())
    .then(data => {
        // SALVAR OS DADOS VINDOS DO BACK-END LOCALMENTE
        // VAMOS UTILIZAR LOCALSTORAGE
        localStorage.setItem('produtos', JSON.stringify(data));
        console.log('Dados dos produtos salvos no localStorage');

        // SIMULAR CARREGAMENTO ONLINE
        setTimeout(() => {
            // ESVAZIAR A ÁREA DE PRODUTOS
            document.getElementById('produtos').innerHTML = '';

            data.forEach(produto => {
                var produtoHTML = `
                    <!--ITEM CARD-->
                    <div class="item-card">
                        <a data-id="${produto.id}" href="#" class="item">
                            <div class="img-container">
                                <img src="${produto.imagem}" alt="${produto.nome}">
                            </div>
                            <div class="nome-rating">
                                <span class="color-gray">${produto.nome}</span>
                                <span class="bold margin-right">
                                    <i class="mdi mdi-star"></i>
                                    ${produto.rating}
                                </span>
                            </div>
                            <div class="price">${produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                        </a>
                    </div>
                `;
                document.getElementById('produtos').insertAdjacentHTML('beforeend', produtoHTML);
            });

            document.querySelectorAll('.item').forEach(item => {
                item.addEventListener('click', function() {
                    var id = this.getAttribute('data-id');
                    localStorage.setItem('detalhe', id);
                    app.views.main.router.navigate('/detalhes/');
                });
            });

        }, 1000);
    })
    .catch(error => console.error('Erro ao fazer fetch dos dados: ' + error)) || [];


    //VER QUANTOS ITENS TEM DENTRO DO CARRINHO
    setTimeout(() => {
       var carrinho = JSON.parse(localStorage.getItem('carrinho'));

       //ALIMENTAR O CONTADOR DA SACOLA
       $('.btn-cart').attr('data-count', carrinho.length);

    }, 300);
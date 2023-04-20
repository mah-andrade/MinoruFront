import { Component, OnInit } from '@angular/core';
import { Garagem } from 'src/app/models/garagem';
import { GaragemService } from 'src/app/services/garagem.service';

@Component({
  selector: 'app-adicionarveiculo',
  templateUrl: './adicionarveiculo.component.html',
  styleUrls: ['./adicionarveiculo.component.css'],
})
export class AdicionarveiculoComponent implements OnInit {
  garagem: Garagem = {
    nome: '',
    telefone: '',
    modelo: '',
    veiculo: '',
    cliente: '',
    horaInicial: '',
    placa: '',
    status: '',
  };
  constructor(private garagemService: GaragemService) {}

  ngOnInit(): void {}
  cadastrar() {
    var horaAtual = new Date();
    this.garagem.horaInicial =
      horaAtual.getHours().toString() + ':' + horaAtual.getMinutes().toString();
    this.garagemService.adicionarVeiculo(this.garagem).then(() => {
      alert('Adicionado com Sucesso!');
    });
  }
}

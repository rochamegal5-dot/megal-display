export interface Resultado {

  puesto: number;

  numero: string;

}

export interface DNLQData {

  fecha: string;

  quiniela: {

    vespertina: Resultado[];

    nocturna: Resultado[];

  };

  tombola: {

    vespertina: Resultado[];

    nocturna: Resultado[];

  };

  fiveGold: {

    numeros: number[];

    extra: number;

    revancha: number[];

    pozo: string;

    pozoRevancha: string;

  };

}

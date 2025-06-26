
export type StatusSlot = 'bloqueado' | 'livre' | 'reservado';

export interface Slot {
  id: string;
  data: Date;
  hora: string;
  status: StatusSlot;
  clienteNome?: string;
  clienteTelefone?: string;
  clienteEmail?: string;
  tipoServico?: string;
}

export interface Reserva {
  id: string;
  slotId: string;
  clienteNome: string;
  clienteTelefone: string;
  clienteEmail?: string;
  tipoServico: string;
  data: Date;
  hora: string;
  status: 'confirmado' | 'cancelado';
}

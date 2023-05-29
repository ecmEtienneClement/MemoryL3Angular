export interface I {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface J extends I {
  nom: string;
  prenom: string;
  adresse: string;
  age: number;
  sexe: Sexe;
  telephone: string[];
}
//TODO
export interface Antecedent extends I {
  allergie: string[];
  medicaux: string[];
  chirugicaux: string[];
  familiaire: string[];
  autre: string[];
  dossierPatient: string;
  personnel: string;
  Personnel?: Personnel;
}
//TODO
export interface CompteBloque extends I {
  email: string;
  byAdmin: boolean;
}
//TODO
export interface Consultation extends I {
  diagnostiqueMedical: string;
  poids: string;
  taille: string;
  imc: string;
  temperature: string;
  frequenceCardiaque: string;
  pressionArterielle: string;
  dossierPatient: string;
  personnel: string;
  Personnel?: Personnel;
}
//TODO
export interface DossierPatient extends I {
  numeroDossier: string;
  motif: string[];
  histoire: string[];
  terrain: string[];
  personnel: string[];
  salle: string;
  patient: string;
  Salle?: Salle;
  Personnel?: Personnel;
  Payements?: Payement[];
  Ordonnances?: Ordonnance[];
  RendezVous?: RendezVous[];
  Antecedent?: Antecedent;
  Consultations?: Consultation[];
}

//TODO
export interface HistoriqueMessage extends I {
  idContact: string[];
}

//TODO
export interface InfoClinique extends I {
  nom: string;
  adresse: string;
  proprietaire: string[];
  email: string[];
  telephone: string[];
}

//TODO
export interface Message extends I {
  idRecepteur: string;
  message: string;
}
//TODO
export interface Ordonnance extends I {
  tbOrdonnance: string[];
  dossierPatient: string;
  DossierPatient?: DossierPatient;
  personnel: string;
  Personnel?: Personnel;
}
//TODO
export interface Patient extends J {
  dateDeNaissance: string;
  proffession: string;
  groupeSanguin: GrpSanguin;
  DossierPatients?: DossierPatient;
}
export enum Sexe {
  M = 'M',
  F = 'F',
}
export enum GrpSanguin {
  On = 'O-',
  Op = 'O+',
  Bn = 'B-',
  An = 'A-',
  ABp = 'AB+',
  ABn = 'AB-',
}
//TODO
export interface Payement extends I {
  description: string;
  montant: number;
  Personnel?: Personnel;
  secretaire: string;
  dossierPatient: string;
  DossierPatient?: DossierPatient;
  Poste?: Poste;
}
//TODO
export interface Personnel extends J {
  profil: string;
  Poste?: Poste;
  email: string;
  jour: string[];
  salaire: number;
  specialisation?: string;
  mdp: string;
}
//TODO
export interface Poste extends I {
  poste: string;
}
//TODO
export interface RendezVous extends I {
  motif: string;
  date: string;
  Personnel?: Personnel;
  personnel: string;
  dossierPatient: string;
  DossierPatient?: DossierPatient;
  TypeRendezVou?: TypeRendezVous;
  typeRendezVous: string;
  secretaire:string;
}
//TODO
export interface Salle extends I {
  TypeDeSalle?: TypeDeSalle;
  typeDeSalle: string;
  numero: number;
  place: number;
}
//TODO
export interface Tache extends I {
  perfusion: string[];
  injection: string[];
  pansement: string[];
  prelevement: string[];
  prisMedicament: string[];
}
//TODO
export interface TypeDeSalle extends I {
  type: string;
}
//TODO
export interface TypeRendezVous extends I {
  type: string;
  prix: number;
}

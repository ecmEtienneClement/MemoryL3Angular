//
export class RoutesNames {
  //Route pour le module Profil
  public static mLogin = {
    login: 'login',
    loginAddAdmin: 'loginAddAdmin',
  };
  //Route pour le module Profil
  public static mProfil = {
    profil: 'profil',
  };
  //Route pour le module personnel
  public static mHome = {
    home: 'home',
    homeConsultation: 'homeConsultation',
    homeRendezVous: 'homeRendezVous',
    homeOrdonnance: 'homeOrdonnance',
    homePayement: 'homePayement',
  };
  //Route pour le module personnel
  public static mPersonnel = {
    personnels: 'personnels',
    personnelsAdd: 'personnelsAdd',
    personnelsUpd: 'personnelsUpd',
    personnelsDetails: 'personnelsDetails',
    personnelsDossier: 'personnelsDossier',
  };

  //Route pour le module patient
  public static mPatient = {
    patients: 'patients',
    patientsAdd: 'patientsAdd',
    patientsUpd: 'patientsUpd',
    patientsDetails: 'patientsDetails',
    patientsDossier: 'patientsDossier',
    patientsTaches: 'patientsTaches',
    patientsTachesAdd: 'patientsTachesAdd',
    patientsTachesDetails: 'patientsTachesDetails',
    patientsDossierAdd: 'patientsDossierAdd',
    patientsDossierUpd: 'patientsDossierUpd',
    patientsDossierDetails: 'patientsDossierDetails',
    patientsConsultationAdd: 'patientsConsultationAdd',
    patientsConsultationUpd: 'patientsConsultationUpd',
    patientsOrdonnanceAdd: 'patientsOrdonnanceAdd',
    patientsOrdonnanceUpd: 'patientsOrdonnanceUpd',
    patientsAntecedentAdd: 'patientsAntecedentAdd',
    patientsAntecedentUpd: 'patientsAntecedentUpd',
    patientsPayementAdd: 'patientsPayementAdd',
    patientsPayementUpd: 'patientsPayementUpd',
    patientsRendezVousAdd: 'patientsRendezVousAdd',
    patientsRendezVousUpd: 'patientsRendezVousUpd',
  };

  //Route pour le module config
  public static mConfig = {
    config: 'config',
    configAdd: 'configAdd',
  };
}

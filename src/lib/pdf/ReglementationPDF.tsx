import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const C = {
  green: "#2d7a4f",
  greenLight: "#e8f5ee",
  greenMid: "#4a9e6d",
  dark: "#1a2e22",
  grey: "#5a6872",
  greyLight: "#f4f7f5",
  white: "#ffffff",
  border: "#c8e0d2",
};

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: C.dark,
    backgroundColor: C.white,
    paddingTop: 0,
    paddingBottom: 40,
  },

  header: {
    backgroundColor: C.green,
    paddingHorizontal: 36,
    paddingTop: 28,
    paddingBottom: 24,
  },
  headerKicker: {
    fontSize: 8,
    color: "#a8d5b8",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    marginBottom: 8,
  },
  headerSub: {
    fontSize: 9.5,
    color: "#d4eedd",
    lineHeight: 1.5,
    maxWidth: 400,
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 36,
    paddingVertical: 14,
    backgroundColor: C.greenLight,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  tag: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontSize: 7.5,
    color: C.green,
    marginRight: 6,
    marginBottom: 4,
  },

  body: {
    paddingHorizontal: 36,
    paddingTop: 20,
  },

  sectionTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: C.green,
    marginBottom: 10,
    marginTop: 4,
    borderBottomWidth: 2,
    borderBottomColor: C.green,
    paddingBottom: 4,
  },

  card: {
    backgroundColor: C.greyLight,
    borderLeftWidth: 3,
    borderLeftColor: C.greenMid,
    borderRadius: 3,
    padding: 12,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.dark,
    marginBottom: 5,
  },
  cardScope: {
    fontSize: 7,
    color: C.greenMid,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },

  // Two-col grid — no gap, use marginRight on first col
  grid2: {
    flexDirection: "row",
    marginBottom: 10,
  },
  gridColLeft: {
    flex: 1,
    marginRight: 5,
  },
  gridColRight: {
    flex: 1,
    marginLeft: 5,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  bullet: {
    width: 14,
    fontSize: 9,
    color: C.green,
    fontFamily: "Helvetica-Bold",
  },
  rowText: {
    flex: 1,
    fontSize: 8.5,
    color: C.dark,
    lineHeight: 1.45,
  },
  rowTextBold: {
    fontFamily: "Helvetica-Bold",
  },

  infoBox: {
    backgroundColor: "#edf6f1",
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 4,
    padding: 10,
    marginBottom: 14,
  },
  infoText: {
    fontSize: 8,
    color: C.grey,
    lineHeight: 1.5,
  },
  infoLabel: {
    fontFamily: "Helvetica-Bold",
    color: C.green,
    fontSize: 8,
  },

  // Ratio badge — ratioNumber gets marginRight instead of gap
  ratioBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.green,
    borderRadius: 4,
    padding: 10,
    marginBottom: 6,
  },
  ratioNumber: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    width: 44,
    textAlign: "center",
    marginRight: 10,
  },
  ratioLabelWrap: {
    flex: 1,
  },
  ratioLabel: {
    fontSize: 8.5,
    color: "#d4eedd",
    lineHeight: 1.4,
  },
  ratioSub: {
    fontSize: 7.5,
    color: "#a8d5b8",
  },

  // Diplome pill — dot gets marginRight instead of gap
  diplomePill: {
    flexDirection: "row",
    backgroundColor: C.greenLight,
    borderRadius: 4,
    padding: 8,
    marginBottom: 5,
    alignItems: "center",
  },
  diplomeDot: {
    width: 8,
    height: 8,
    backgroundColor: C.green,
    borderRadius: 4,
    marginRight: 8,
  },
  diplomeTitle: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: C.dark,
  },
  diplomeSub: {
    fontSize: 7.5,
    color: C.grey,
  },

  spacerSm: { marginBottom: 8 },

  footer: {
    position: "absolute",
    bottom: 16,
    left: 36,
    right: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 8,
  },
  footerText: {
    fontSize: 7,
    color: C.grey,
  },
  footerBrand: {
    fontSize: 7,
    color: C.green,
    fontFamily: "Helvetica-Bold",
  },
});

const Bullet = ({ children }: { children: string }) => (
  <View style={s.row}>
    <Text style={s.bullet}>›</Text>
    <Text style={s.rowText}>{children}</Text>
  </View>
);

const BulletBold = ({ label, text }: { label: string; text: string }) => (
  <View style={s.row}>
    <Text style={s.bullet}>›</Text>
    <Text style={s.rowText}>
      <Text style={s.rowTextBold}>{label} </Text>
      {text}
    </Text>
  </View>
);

const Footer = () => (
  <View style={s.footer} fixed>
    <Text style={s.footerText}>
      Fiche pratique — Réglementation petite enfance — Mai 2026
    </Text>
    <Text style={s.footerBrand}>LGC Jeunesse</Text>
    <Text
      style={s.footerText}
      render={({ pageNumber, totalPages }) =>
        `Page ${pageNumber} / ${totalPages}`
      }
    />
  </View>
);

export function ReglementationPDF() {
  return (
    <Document
      title="Fiche pratique – Réglementation petite enfance"
      author="LGC Jeunesse"
      subject="Cadre réglementaire structures d'accueil de la petite enfance"
    >
      {/* ── PAGE 1 ── */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.headerKicker}>LGC Jeunesse — Petite enfance</Text>
          <Text style={s.headerTitle}>
            Fiche pratique — Réglementation petite enfance
          </Text>
          <Text style={s.headerSub}>
            Grands repères réglementaires pour les structures d'accueil du jeune
            enfant (EAJE) : sécurité, hygiène, personnel, documents et
            communication avec les familles.
          </Text>
        </View>

        <View style={s.tagRow}>
          {[
            "Intervenants diplômés",
            "Continuité de service",
            "Supports internes",
            "Suivi qualité",
            "EAJE",
            "PMI",
          ].map((t) => (
            <Text key={t} style={s.tag}>
              {t}
            </Text>
          ))}
        </View>

        <View style={s.body}>
          {/* 1. Cadre légal */}
          <Text style={s.sectionTitle}>1. Cadre légal de référence</Text>
          <View style={s.infoBox}>
            <Text style={s.infoText}>
              <Text style={s.infoLabel}>Décret n°2021-1131 </Text>
              relatif aux EAJE — définit les conditions d'agrément,
              d'organisation et de fonctionnement.{"\n"}
              <Text style={s.infoLabel}>
                Code de l'action sociale et des familles (CASF){" "}
              </Text>
              — articles L.2324-1 et suivants.{"\n"}
              <Text style={s.infoLabel}>
                Protection Maternelle et Infantile (PMI){" "}
              </Text>
              — autorité de contrôle et d'agrément des structures.
            </Text>
          </View>

          {/* 2. Taux encadrement */}
          <Text style={s.sectionTitle}>2. Taux d'encadrement</Text>
          <View style={s.grid2}>
            <View style={s.gridColLeft}>
              <View style={s.ratioBadge}>
                <Text style={s.ratioNumber}>1/5</Text>
                <View style={s.ratioLabelWrap}>
                  <Text style={s.ratioLabel}>Enfants non-marcheurs</Text>
                  <Text style={s.ratioSub}>
                    1 adulte pour 5 enfants (moins de 18 mois)
                  </Text>
                </View>
              </View>
            </View>
            <View style={s.gridColRight}>
              <View style={s.ratioBadge}>
                <Text style={s.ratioNumber}>1/8</Text>
                <View style={s.ratioLabelWrap}>
                  <Text style={s.ratioLabel}>Enfants marcheurs</Text>
                  <Text style={s.ratioSub}>
                    1 adulte pour 8 enfants (18 mois et plus)
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={s.spacerSm} />

          {/* 3. Qualifications */}
          <Text style={s.sectionTitle}>3. Qualifications du personnel</Text>
          <View style={s.grid2}>
            <View style={s.gridColLeft}>
              {[
                { title: "EJE", sub: "Éducateur de Jeunes Enfants — Bac+3 (DEEJE)" },
                { title: "Auxiliaire de puériculture", sub: "Diplôme d'État — 12 mois de formation" },
              ].map((d) => (
                <View key={d.title} style={s.diplomePill}>
                  <View style={s.diplomeDot} />
                  <View>
                    <Text style={s.diplomeTitle}>{d.title}</Text>
                    <Text style={s.diplomeSub}>{d.sub}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={s.gridColRight}>
              {[
                { title: "CAP AEPE", sub: "Accompagnant Éducatif Petite Enfance" },
                { title: "Infirmière puéricultrice", sub: "Direction obligatoire si > 40 places" },
              ].map((d) => (
                <View key={d.title} style={s.diplomePill}>
                  <View style={s.diplomeDot} />
                  <View>
                    <Text style={s.diplomeTitle}>{d.title}</Text>
                    <Text style={s.diplomeSub}>{d.sub}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={s.card}>
            <Text style={s.cardScope}>Obligation légale</Text>
            <Text style={s.cardTitle}>Référent santé et accueil inclusif</Text>
            <Bullet>Médecin ou infirmier(ère) désigné(e) dans chaque structure</Bullet>
            <Bullet>Garant du projet de santé, du PAI et des protocoles médicaux</Bullet>
            <Bullet>Formation continue obligatoire (18h/an minimum recommandé)</Bullet>
          </View>
        </View>

        <Footer />
      </Page>

      {/* ── PAGE 2 ── */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.headerKicker}>LGC Jeunesse — Petite enfance</Text>
          <Text style={s.headerTitle}>
            Hygiène, sécurité & documents obligatoires
          </Text>
        </View>
        <View style={s.tagRow}>
          {["Hygiène", "Sécurité", "Administration", "Nutrition"].map((t) => (
            <Text key={t} style={s.tag}>{t}</Text>
          ))}
        </View>

        <View style={s.body}>
          <Text style={s.sectionTitle}>4. Hygiène et sécurité</Text>
          <View style={s.grid2}>
            <View style={s.gridColLeft}>
              <View style={s.card}>
                <Text style={s.cardScope}>Protocoles quotidiens</Text>
                <Text style={s.cardTitle}>Hygiène des locaux</Text>
                <Bullet>Lavage des mains : avant/après change, repas, activités extérieures</Bullet>
                <Bullet>Désinfection des surfaces de change après chaque utilisation</Bullet>
                <Bullet>Entretien des jouets et matériels en contact avec la bouche</Bullet>
                <Bullet>Gestion des couches en sac hermétique, poubelle fermée</Bullet>
              </View>
            </View>
            <View style={s.gridColRight}>
              <View style={s.card}>
                <Text style={s.cardScope}>Médicaments</Text>
                <Text style={s.cardTitle}>Administration médicale</Text>
                <Bullet>Ordonnance obligatoire pour tout médicament administré</Bullet>
                <Bullet>PAI pour les allergies et pathologies chroniques</Bullet>
                <Bullet>Registre de traçabilité : date, heure, dose, signature</Bullet>
                <Bullet>Stock d'urgence : Adrénaline si PAI allergie sévère</Bullet>
              </View>
            </View>
          </View>

          <View style={s.card}>
            <Text style={s.cardScope}>Sécurité des locaux</Text>
            <Text style={s.cardTitle}>Prévention et procédures d'urgence</Text>
            <View style={s.grid2}>
              <View style={s.gridColLeft}>
                <BulletBold label="Plan d'évacuation :" text="affiché, exercice 2×/an minimum" />
                <BulletBold label="Registre de sécurité :" text="vérifications périodiques consignées" />
                <BulletBold label="Trousse de secours :" text="accessible, inventaire mensuel" />
              </View>
              <View style={s.gridColRight}>
                <BulletBold label="Détecteurs de fumée :" text="obligatoires, testés chaque mois" />
                <BulletBold label="Numéros d'urgence :" text="affichés (15, 18, 17, SAMU)" />
                <BulletBold label="Barrières et protections :" text="conformes aux normes NF EN 1930" />
              </View>
            </View>
          </View>

          <Text style={s.sectionTitle}>5. Documents obligatoires à tenir</Text>
          <View style={s.grid2}>
            <View style={s.gridColLeft}>
              <View style={s.card}>
                <Text style={s.cardScope}>Documents de structure</Text>
                <Bullet>Projet d'établissement (révisé tous les 5 ans)</Bullet>
                <Bullet>Règlement de fonctionnement remis aux familles</Bullet>
                <Bullet>Projet éducatif et pédagogique</Bullet>
                <Bullet>Projet de santé (Référent santé)</Bullet>
                <Bullet>Plan d'organisation en cas de crise sanitaire</Bullet>
              </View>
            </View>
            <View style={s.gridColRight}>
              <View style={s.card}>
                <Text style={s.cardScope}>Suivi individuel enfant</Text>
                <Bullet>Fiche sanitaire complète (vaccins, allergies, médecin)</Bullet>
                <Bullet>Autorisation parentale : soins d'urgence, sorties, photos</Bullet>
                <Bullet>PAI si pathologie ou allergie déclarée</Bullet>
                <Bullet>Registre de présences journalières (Arrivée/Départ)</Bullet>
                <Bullet>Transmissions écrites quotidiennes aux familles</Bullet>
              </View>
            </View>
          </View>

          <Text style={s.sectionTitle}>6. Nutrition et alimentation</Text>
          <View style={s.card}>
            <Text style={s.cardScope}>Recommandations GEMRCN</Text>
            <Text style={s.cardTitle}>
              Groupe d'Étude des Marchés Restauration Collective
            </Text>
            <View style={s.grid2}>
              <View style={s.gridColLeft}>
                <Bullet>Menus équilibrés : légumes, féculents, protéines, produits laitiers</Bullet>
                <Bullet>Fréquences alimentaires GEMRCN (sur 20 repas)</Bullet>
                <Bullet>Sel et matières grasses limités pour les moins de 3 ans</Bullet>
              </View>
              <View style={s.gridColRight}>
                <Bullet>Affichage du menu 15 jours à l'avance</Bullet>
                <Bullet>Traçabilité des fournisseurs et allergènes (14 majeurs)</Bullet>
                <Bullet>Aliments interdits : miel avant 12 mois, charcuterie avant 3 ans</Bullet>
              </View>
            </View>
          </View>
        </View>

        <Footer />
      </Page>

      {/* ── PAGE 3 ── */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.headerKicker}>LGC Jeunesse — Petite enfance</Text>
          <Text style={s.headerTitle}>
            Communication familles & points de vigilance
          </Text>
        </View>
        <View style={s.tagRow}>
          {["Communication", "Familles", "Qualité", "Accessibilité", "RGPD"].map((t) => (
            <Text key={t} style={s.tag}>{t}</Text>
          ))}
        </View>

        <View style={s.body}>
          <Text style={s.sectionTitle}>7. Communication avec les familles</Text>
          <View style={s.grid2}>
            <View style={s.gridColLeft}>
              <View style={s.card}>
                <Text style={s.cardScope}>Transmissions quotidiennes</Text>
                <Text style={s.cardTitle}>À communiquer chaque jour</Text>
                <Bullet>Repas : quantités, appétit, texture acceptée</Bullet>
                <Bullet>Sommeil : heures de sieste, qualité</Bullet>
                <Bullet>Selles : fréquence et consistance (nourrissons)</Bullet>
                <Bullet>Activités réalisées et humeur générale</Bullet>
                <Bullet>Tout incident ou chute, même mineur (fiche signée)</Bullet>
              </View>
            </View>
            <View style={s.gridColRight}>
              <View style={s.card}>
                <Text style={s.cardScope}>Documents à remettre</Text>
                <Text style={s.cardTitle}>Remis obligatoirement</Text>
                <Bullet>Règlement de fonctionnement (signature des deux parties)</Bullet>
                <Bullet>Projet d'établissement (sur demande ou remis)</Bullet>
                <Bullet>Grille tarifaire et modalités de facturation</Bullet>
                <Bullet>Coordonnées du référent santé et de la PMI locale</Bullet>
                <Bullet>Procédure de réclamation et voies de recours (CAF, PMI)</Bullet>
              </View>
            </View>
          </View>

          <View style={s.card}>
            <Text style={s.cardScope}>RGPD & données personnelles</Text>
            <Text style={s.cardTitle}>Protection des données des enfants et familles</Text>
            <Bullet>Consentement écrit obligatoire avant toute prise de photo ou vidéo d'un enfant</Bullet>
            <Bullet>Les fiches sanitaires sont des données sensibles (art. 9 RGPD)</Bullet>
            <Bullet>Durée de conservation : dossiers enfants conservés 5 ans après la sortie</Bullet>
            <Bullet>Droit d'accès et de rectification des parents sur toutes leurs données</Bullet>
          </View>

          <Text style={s.sectionTitle}>8. Points de vigilance clés</Text>
          <View style={s.grid2}>
            <View style={s.gridColLeft}>
              <View style={s.card}>
                <Text style={s.cardScope}>Accueil inclusif</Text>
                <Text style={s.cardTitle}>Enfants en situation de handicap</Text>
                <Bullet>Obligation d'accueil non-discriminatoire (loi 2005-102)</Bullet>
                <Bullet>PAI ou PPS adapté à chaque enfant</Bullet>
                <Bullet>MDPH : mobilisation des aides si nécessaire</Bullet>
              </View>
            </View>
            <View style={s.gridColRight}>
              <View style={s.card}>
                <Text style={s.cardScope}>Protection de l'enfance</Text>
                <Text style={s.cardTitle}>Signalement obligatoire</Text>
                <Bullet>Tout professionnel est tenu de signaler une situation de maltraitance</Bullet>
                <Bullet>Signalement au Procureur ou à la CRIP</Bullet>
                <Bullet>Formation de l'équipe : repérer les signes de violence ou de négligence</Bullet>
              </View>
            </View>
          </View>

          <View style={[s.infoBox, { marginTop: 6 }]}>
            <Text style={[s.infoLabel, { marginBottom: 6 }]}>
              Contacts et ressources utiles
            </Text>
            <Text style={s.infoText}>
              <Text style={s.infoLabel}>PMI locale </Text>— autorité de contrôle, agrément et inspections.{"\n"}
              <Text style={s.infoLabel}>CAF </Text>— financement (PSU : Prestation de Service Unique) et conventionnement.{"\n"}
              <Text style={s.infoLabel}>CRIP </Text>— Cellule de Recueil des Informations Préoccupantes (protection de l'enfance).{"\n"}
              <Text style={s.infoLabel}>119 </Text>— Allô Enfance en Danger (signalement urgent).
            </Text>
          </View>
        </View>

        <Footer />
      </Page>
    </Document>
  );
}

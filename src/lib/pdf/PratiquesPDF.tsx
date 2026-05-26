import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const C = {
  blue: "#2d5a8e",
  blueLight: "#e8eef7",
  blueMid: "#4a7ab5",
  dark: "#1a2233",
  grey: "#5a6872",
  greyLight: "#f5f6f8",
  white: "#ffffff",
  border: "#c8d5e8",
  accent: "#e8932d",
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
    backgroundColor: C.blue,
    paddingHorizontal: 36,
    paddingTop: 28,
    paddingBottom: 24,
  },
  headerKicker: {
    fontSize: 8,
    color: "#a8c0dc",
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
    color: "#d4e2f4",
    lineHeight: 1.5,
    maxWidth: 420,
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 36,
    paddingVertical: 14,
    backgroundColor: C.blueLight,
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
    color: C.blue,
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
    color: C.blue,
    marginBottom: 10,
    marginTop: 4,
    borderBottomWidth: 2,
    borderBottomColor: C.blue,
    paddingBottom: 4,
  },

  card: {
    backgroundColor: C.greyLight,
    borderLeftWidth: 3,
    borderLeftColor: C.blueMid,
    borderRadius: 3,
    padding: 12,
    marginBottom: 10,
  },
  cardAccent: {
    backgroundColor: C.greyLight,
    borderLeftWidth: 3,
    borderLeftColor: C.accent,
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
    color: C.blueMid,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  cardScopeAccent: {
    fontSize: 7,
    color: C.accent,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },

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
    color: C.blue,
    fontFamily: "Helvetica-Bold",
  },
  bulletAccent: {
    width: 14,
    fontSize: 9,
    color: C.accent,
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

  // Timeline item for journée type
  timelineItem: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "flex-start",
  },
  timelineBadge: {
    backgroundColor: C.blue,
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 10,
    minWidth: 52,
  },
  timelineTime: {
    fontSize: 7.5,
    color: C.white,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
  },
  timelineContent: {
    flex: 1,
    paddingTop: 2,
  },
  timelineLabel: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: C.dark,
  },
  timelineDesc: {
    fontSize: 7.5,
    color: C.grey,
    lineHeight: 1.4,
  },

  // Fiche métier header
  ficheHeader: {
    backgroundColor: C.blueMid,
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  ficheNum: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: C.white,
    width: 32,
    textAlign: "center",
    marginRight: 10,
  },
  ficheTitleWrap: {
    flex: 1,
  },
  ficheTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.white,
  },
  ficheSub: {
    fontSize: 8,
    color: "#d4e2f4",
  },

  infoBox: {
    backgroundColor: "#eef3fb",
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 8,
    color: C.grey,
    lineHeight: 1.5,
  },
  infoLabel: {
    fontFamily: "Helvetica-Bold",
    color: C.blue,
    fontSize: 8,
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
  footerText: { fontSize: 7, color: C.grey },
  footerBrand: { fontSize: 7, color: C.blue, fontFamily: "Helvetica-Bold" },
});

const Bullet = ({ children }: { children: string }) => (
  <View style={s.row}>
    <Text style={s.bullet}>›</Text>
    <Text style={s.rowText}>{children}</Text>
  </View>
);

const BulletAccent = ({ children }: { children: string }) => (
  <View style={s.row}>
    <Text style={s.bulletAccent}>›</Text>
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
      Fiches métier — Pratiques professionnelles petite enfance — Mai 2026
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

const timeline = [
  { time: "07h30–08h30", label: "Accueil échelonné", desc: "Accueil individualisé, transmissions orales avec les familles, installation progressive" },
  { time: "08h30–09h00", label: "Temps de regroupement", desc: "Rituel du matin, présences, météo, chanson — ancrage des repères temporels" },
  { time: "09h00–11h00", label: "Activités libres & guidées", desc: "Jeux libres, ateliers en petits groupes, sorties extérieures si météo favorable" },
  { time: "11h00–11h30", label: "Temps de toilette", desc: "Changes, hygiène des mains, préparation au repas en autonomie progressive" },
  { time: "11h30–12h30", label: "Repas", desc: "Ambiance calme, autonomie valorisée, observation des appétits, allergènes vérifiés" },
  { time: "12h30–14h30", label: "Sieste / repos", desc: "Respect des rythmes individuels, endormissement accompagné, surveillance active" },
  { time: "14h30–16h30", label: "Activités d'éveil", desc: "Motricité, arts plastiques, lecture, musique — alternance calme/dynamique" },
  { time: "16h30–19h00", label: "Goûter & départs", desc: "Goûter collectif, transmissions aux familles, bilan de journée consigné" },
];

export function PratiquesPDF() {
  return (
    <Document
      title="Fiches métier – Pratiques professionnelles petite enfance"
      author="LGC Jeunesse"
      subject="Pratiques professionnelles pour les intervenants en structures petite enfance"
    >
      {/* ── PAGE 1 : Organisation & Observation ── */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.headerKicker}>LGC Jeunesse — Petite enfance</Text>
          <Text style={s.headerTitle}>Fiches métier — Pratiques professionnelles</Text>
          <Text style={s.headerSub}>
            Repères concrets du quotidien pour les professionnels de la petite enfance :
            organisation, observation, travail en équipe et relation avec les familles.
          </Text>
        </View>

        <View style={s.tagRow}>
          {["Présentiel / visio", "Individuel", "Fiches par situation", "Posture en équipe", "Transmissions"].map((t) => (
            <Text key={t} style={s.tag}>{t}</Text>
          ))}
        </View>

        <View style={s.body}>
          {/* Fiche 1 */}
          <View style={s.ficheHeader}>
            <Text style={s.ficheNum}>01</Text>
            <View style={s.ficheTitleWrap}>
              <Text style={s.ficheTitle}>Organisation de la journée</Text>
              <Text style={s.ficheSub}>Cadre de travail — structurer les temps pour sécuriser l'enfant</Text>
            </View>
          </View>

          <Text style={s.sectionTitle}>Journée type en structure d'accueil</Text>
          {timeline.map((t) => (
            <View key={t.time} style={s.timelineItem}>
              <View style={s.timelineBadge}>
                <Text style={s.timelineTime}>{t.time}</Text>
              </View>
              <View style={s.timelineContent}>
                <Text style={s.timelineLabel}>{t.label}</Text>
                <Text style={s.timelineDesc}>{t.desc}</Text>
              </View>
            </View>
          ))}

          <View style={[s.infoBox, { marginTop: 6 }]}>
            <Text style={s.infoText}>
              <Text style={s.infoLabel}>Principe clé : </Text>
              La régularité des rituels est un facteur de sécurité affective. Un enfant qui
              anticipe la suite de sa journée est un enfant apaisé et disponible aux apprentissages.
            </Text>
          </View>
        </View>

        <Footer />
      </Page>

      {/* ── PAGE 2 : Observation & Équipe ── */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.headerKicker}>LGC Jeunesse — Petite enfance</Text>
          <Text style={s.headerTitle}>Observation & travail en équipe</Text>
        </View>
        <View style={s.tagRow}>
          {["Observation", "Posture professionnelle", "Coordination", "Transmissions"].map((t) => (
            <Text key={t} style={s.tag}>{t}</Text>
          ))}
        </View>

        <View style={s.body}>
          {/* Fiche 2 */}
          <View style={s.ficheHeader}>
            <Text style={s.ficheNum}>02</Text>
            <View style={s.ficheTitleWrap}>
              <Text style={s.ficheTitle}>Observation de l'enfant</Text>
              <Text style={s.ficheSub}>Posture professionnelle — observer sans intervenir systématiquement</Text>
            </View>
          </View>

          <View style={s.grid2}>
            <View style={s.gridColLeft}>
              <View style={s.card}>
                <Text style={s.cardScope}>Pourquoi observer ?</Text>
                <Text style={s.cardTitle}>Les objectifs de l'observation</Text>
                <Bullet>Repérer les besoins individuels (sécurité, autonomie, lien)</Bullet>
                <Bullet>Ajuster les propositions d'activité au niveau réel de l'enfant</Bullet>
                <Bullet>Détecter précocement les signes de mal-être ou de retard</Bullet>
                <Bullet>Nourrir les transmissions aux familles avec des faits précis</Bullet>
              </View>
            </View>
            <View style={s.gridColRight}>
              <View style={s.card}>
                <Text style={s.cardScope}>Comment observer ?</Text>
                <Text style={s.cardTitle}>Méthodes pratiques</Text>
                <Bullet>Observer sans intervenir : laisser l'enfant résoudre avant d'aider</Bullet>
                <Bullet>Prendre des notes courtes : heure, situation, comportement observé</Bullet>
                <Bullet>Différencier fait observable et interprétation</Bullet>
                <Bullet>Partager l'observation en réunion d'équipe pour croiser les regards</Bullet>
              </View>
            </View>
          </View>

          <View style={s.cardAccent}>
            <Text style={s.cardScopeAccent}>Outil — Grille d'observation simplifiée</Text>
            <Text style={s.cardTitle}>Ce que l'on note au quotidien</Text>
            <View style={s.grid2}>
              <View style={s.gridColLeft}>
                <BulletBold label="Motricité :" text="déplacements, préhension, coordination" />
                <BulletBold label="Langage :" text="sons, mots, phrases, compréhension" />
                <BulletBold label="Social :" text="regard, imitation, interactions avec pairs" />
              </View>
              <View style={s.gridColRight}>
                <BulletBold label="Émotionnel :" text="pleurs, agitation, retrait, joie" />
                <BulletBold label="Autonomie :" text="repas, habillage, endormissement" />
                <BulletBold label="Jeu :" text="solitaire, parallèle, coopératif" />
              </View>
            </View>
          </View>

          {/* Fiche 3 */}
          <View style={s.ficheHeader}>
            <Text style={s.ficheNum}>03</Text>
            <View style={s.ficheTitleWrap}>
              <Text style={s.ficheTitle}>Travail en équipe</Text>
              <Text style={s.ficheSub}>Coordination — répartition des rôles et temps d'échange</Text>
            </View>
          </View>

          <View style={s.grid2}>
            <View style={s.gridColLeft}>
              <View style={s.card}>
                <Text style={s.cardScope}>Réunions d'équipe</Text>
                <Text style={s.cardTitle}>Organisation des échanges</Text>
                <Bullet>Réunion hebdomadaire : organisation de la semaine, cas complexes</Bullet>
                <Bullet>Réunion mensuelle : bilan, projets, ajustements pédagogiques</Bullet>
                <Bullet>Réunion de synthèse : enfants nécessitant une attention particulière</Bullet>
                <Bullet>Analyse de pratiques (APP) avec intervenant extérieur : trimestrielle</Bullet>
              </View>
            </View>
            <View style={s.gridColRight}>
              <View style={s.card}>
                <Text style={s.cardScope}>Transmissions internes</Text>
                <Text style={s.cardTitle}>Entre collègues au quotidien</Text>
                <Bullet>Passation orale en début de poste : incidents, enfants à surveiller</Bullet>
                <Bullet>Cahier de bord commun : un outil partagé, pas personnel</Bullet>
                <Bullet>Ton factuel : ce qui s'est passé, pas ce qu'on en pense</Bullet>
                <Bullet>Discrétion : pas d'échanges sur les familles dans les espaces communs</Bullet>
              </View>
            </View>
          </View>

          <View style={s.infoBox}>
            <Text style={s.infoText}>
              <Text style={s.infoLabel}>Posture en équipe : </Text>
              Le désaccord entre collègues se règle hors de la présence des enfants et des familles.
              La cohérence éducative visible est prioritaire sur l'expression des divergences personnelles.
            </Text>
          </View>
        </View>

        <Footer />
      </Page>

      {/* ── PAGE 3 : Familles & Éthique ── */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.headerKicker}>LGC Jeunesse — Petite enfance</Text>
          <Text style={s.headerTitle}>Relation familles & posture éthique</Text>
        </View>
        <View style={s.tagRow}>
          {["Communication", "Familles", "Bientraitance", "Éthique", "Secret professionnel"].map((t) => (
            <Text key={t} style={s.tag}>{t}</Text>
          ))}
        </View>

        <View style={s.body}>
          {/* Fiche 4 */}
          <View style={s.ficheHeader}>
            <Text style={s.ficheNum}>04</Text>
            <View style={s.ficheTitleWrap}>
              <Text style={s.ficheTitle}>Relation avec les familles</Text>
              <Text style={s.ficheSub}>Communication — cadre clair, échanges bienveillants</Text>
            </View>
          </View>

          <View style={s.card}>
            <Text style={s.cardScope}>Temps d'accueil (matin)</Text>
            <Text style={s.cardTitle}>Rituels du matin avec les familles</Text>
            <Bullet>Accueillir le parent et l'enfant ensemble : ne pas "arracher" l'enfant</Bullet>
            <Bullet>Recueillir les informations de nuit : sommeil, santé, humeur</Bullet>
            <Bullet>Rassurer le parent anxieux avec des faits concrets et positifs</Bullet>
            <Bullet>Limiter la durée du temps de séparation si l'enfant est serein</Bullet>
          </View>

          <View style={s.card}>
            <Text style={s.cardScope}>Temps de départ (soir)</Text>
            <Text style={s.cardTitle}>Transmissions du soir</Text>
            <Bullet>Toujours finir sur quelque chose de positif ou de concret</Bullet>
            <Bullet>Signaler tout incident même bénin (chute, morsure, pleurs prolongés)</Bullet>
            <Bullet>Ne pas livrer d'informations sur les autres enfants de la structure</Bullet>
            <Bullet>Orienter vers le référent ou la direction pour les sujets complexes</Bullet>
          </View>

          <View style={s.cardAccent}>
            <Text style={s.cardScopeAccent}>Situations délicates — Comment réagir</Text>
            <Text style={s.cardTitle}>Cas concrets et réponses professionnelles</Text>
            <BulletBold label="Parent en colère :" text="ne pas répondre dans l'urgence, proposer un rendez-vous calme avec la direction" />
            <BulletBold label="Confidences de l'enfant :" text="écouter sans promettre le secret, consigner et référer au responsable" />
            <BulletBold label="Désaccord éducatif :" text="exposer le cadre de la structure sans juger les pratiques familiales" />
            <BulletBold label="Retard répété à la fermeture :" text="appliquer le protocole défini dans le règlement de fonctionnement" />
          </View>

          {/* Fiche 5 */}
          <View style={s.ficheHeader}>
            <Text style={s.ficheNum}>05</Text>
            <View style={s.ficheTitleWrap}>
              <Text style={s.ficheTitle}>Posture éthique & bientraitance</Text>
              <Text style={s.ficheSub}>Éthique — droits de l'enfant, secret professionnel, bientraitance</Text>
            </View>
          </View>

          <View style={s.card}>
            <Text style={s.cardScope}>Bientraitance</Text>
            <Text style={s.cardTitle}>Gestes et postures au quotidien</Text>
            <BulletAccent>Toujours prévenir l'enfant avant de le toucher (change, soins)</BulletAccent>
            <BulletAccent>Respecter le rythme individuel : ne pas forcer repas ou sieste</BulletAccent>
            <BulletAccent>Nommer les émotions de l'enfant pour l'aider à les identifier</BulletAccent>
            <BulletAccent>Éviter les comparaisons entre enfants, même bienveillantes</BulletAccent>
            <BulletAccent>Ne jamais laisser un enfant en pleurs sans réponse adulte</BulletAccent>
          </View>

          <View style={s.card}>
            <Text style={s.cardScope}>Éthique professionnelle</Text>
            <Text style={s.cardTitle}>Obligations et limites</Text>
            <Bullet>Secret professionnel : tout ce qui concerne l'enfant et la famille reste confidentiel</Bullet>
            <Bullet>Ne pas partager d'informations sur les familles sur les réseaux sociaux</Bullet>
            <Bullet>Signalement obligatoire si suspicion de maltraitance (cf. fiche réglementation)</Bullet>
            <Bullet>Neutralité : ne pas prendre parti dans les conflits parentaux (séparation, garde)</Bullet>
            <Bullet>Continuité de service : assurer la présence même en cas de désaccord avec la direction</Bullet>
          </View>

          <View style={s.infoBox}>
            <Text style={[s.infoLabel, { marginBottom: 5 }]}>
              Pour aller plus loin
            </Text>
            <Text style={s.infoText}>
              <Text style={s.infoLabel}>Convention internationale des droits de l'enfant (CIDE, 1989) </Text>
              — article 3 : intérêt supérieur de l'enfant dans toute décision.{"\n"}
              <Text style={s.infoLabel}>Charte nationale de la bientraitance </Text>
              — ANESM (Agence nationale de l'évaluation et de la qualité des ESMS).{"\n"}
              <Text style={s.infoLabel}>Analyse des pratiques professionnelles (APP) </Text>
              — supervision régulière recommandée pour prévenir l'épuisement professionnel.
            </Text>
          </View>
        </View>

        <Footer />
      </Page>
    </Document>
  );
}

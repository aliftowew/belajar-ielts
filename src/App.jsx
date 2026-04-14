import { useState, useEffect, useCallback, useMemo, useRef } from "react";

// ============================================================
// 14 QUESTION TYPES WITH ICONS
// ============================================================

const Icon = ({ name, size = 24, color = "currentColor" }) => {
  const icons = {
    headings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4v16M18 4v16M3 8h6M3 16h6M15 8h6M15 16h6"/></svg>,
    info: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    features: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
    endings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
    tfng: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/><line x1="14" y1="6" x2="20" y2="12" opacity="0.4"/></svg>,
    ynng: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>,
    mc: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill={color}/></svg>,
    summary: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>,
    notes: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
    sentence: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M4 12h10M4 17h16"/></svg>,
    short: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    diagram: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><line x1="9" y1="6" x2="15" y2="6"/><line x1="6" y1="9" x2="6" y2="15"/></svg>,
    title: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>,
    list: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    key: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
    lock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    google: <svg width={size} height={size} viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>,
    headphones: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
    book: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    play: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color}><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    pause: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
    stats: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    flame: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
    trophy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="9" x2="6" y2="2"/><path d="M6 9a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V2H6z"/><path d="M2 9a4 4 0 0 0 4 4M22 9a4 4 0 0 1-4 4M9 22h6M12 17v5"/></svg>,
    map: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
    form: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="13" x2="13" y2="13"/><line x1="7" y1="17" x2="11" y2="17"/></svg>,
  };
  return icons[name] || null;
};

const QUESTION_TYPES = {
  MATCHING_HEADINGS:  { id: "MATCHING_HEADINGS",  label: "Matching Headings",          short: "Headings",      icon: "headings", color: "#F59E0B", desc: "Mencocokkan topik utama dengan paragraf yang tepat" },
  MATCHING_INFO:      { id: "MATCHING_INFO",      label: "Matching Paragraph Info",    short: "Para Info",     icon: "info",     color: "#10B981", desc: "Menemukan informasi spesifik di paragraf tertentu" },
  MATCHING_FEATURES:  { id: "MATCHING_FEATURES",  label: "Matching Features",          short: "Features",      icon: "features", color: "#06B6D4", desc: "Mencocokkan pernyataan dengan klasifikasi/fitur" },
  MATCHING_ENDINGS:   { id: "MATCHING_ENDINGS",   label: "Matching Sentence Endings",  short: "Endings",       icon: "endings",  color: "#F97316", desc: "Menyelesaikan kalimat dengan ujung yang tepat" },
  TFNG:               { id: "TFNG",               label: "True / False / Not Given",   short: "T/F/NG",        icon: "tfng",     color: "#3B82F6", desc: "Pernyataan sesuai fakta teks atau tidak" },
  YNNG:               { id: "YNNG",               label: "Yes / No / Not Given",       short: "Y/N/NG",        icon: "ynng",     color: "#8B5CF6", desc: "Pernyataan sesuai pendapat penulis atau tidak" },
  MC:                 { id: "MC",                 label: "Multiple Choice",            short: "MC",            icon: "mc",       color: "#EF4444", desc: "Pilih satu jawaban benar dari beberapa pilihan" },
  SUMMARY_COMPLETION: { id: "SUMMARY_COMPLETION", label: "Summary Completion",         short: "Summary",       icon: "summary",  color: "#84CC16", desc: "Mengisi ringkasan teks yang rumpang" },
  NOTE_COMPLETION:    { id: "NOTE_COMPLETION",    label: "Note / Table / Flow-chart",  short: "Notes/Table",   icon: "notes",    color: "#6366F1", desc: "Melengkapi tabel, catatan, atau diagram alir" },
  SENTENCE_COMPLETION:{ id: "SENTENCE_COMPLETION",label: "Sentence Completion",        short: "Sentence",      icon: "sentence", color: "#EC4899", desc: "Melengkapi kalimat yang belum selesai" },
  SHORT_ANSWER:       { id: "SHORT_ANSWER",       label: "Short Answer",               short: "Short Ans",     icon: "short",    color: "#A855F7", desc: "Menjawab pertanyaan dengan batas jumlah kata" },
  DIAGRAM:            { id: "DIAGRAM",            label: "Diagram Label Completion",   short: "Diagram",       icon: "diagram",  color: "#14B8A6", desc: "Melabeli diagram berdasarkan informasi bacaan" },
  CHOOSE_TITLE:       { id: "CHOOSE_TITLE",       label: "Choose a Title",             short: "Title",         icon: "title",    color: "#D946EF", desc: "Memilih judul terbaik untuk teks" },
  LIST_OPTIONS:       { id: "LIST_OPTIONS",       label: "List of Options",            short: "List",          icon: "list",     color: "#0EA5E9", desc: "Memilih jawaban dari daftar pilihan tersedia" },
};

// Listening question types (overlap dengan reading + spesifik listening)
const LISTENING_TYPES = {
  L_FORM:      { id: "L_FORM",     label: "Form Completion",       short: "Form",      icon: "form",     color: "#06B6D4", desc: "Lengkapi formulir dengan info yang didengar" },
  L_NOTE:      { id: "L_NOTE",     label: "Note Completion",       short: "Notes",     icon: "notes",    color: "#6366F1", desc: "Lengkapi catatan/tabel dari audio" },
  L_MC:        { id: "L_MC",       label: "Multiple Choice",       short: "MC",        icon: "mc",       color: "#EF4444", desc: "Pilih jawaban benar berdasar audio" },
  L_MAP:       { id: "L_MAP",      label: "Plan / Map / Diagram",  short: "Map",       icon: "map",      color: "#10B981", desc: "Labeli peta/denah berdasar audio" },
  L_MATCHING:  { id: "L_MATCHING", label: "Matching",              short: "Matching",  icon: "features", color: "#F59E0B", desc: "Cocokkan item ke kategori dari audio" },
  L_SENTENCE:  { id: "L_SENTENCE", label: "Sentence Completion",   short: "Sentence",  icon: "sentence", color: "#EC4899", desc: "Lengkapi kalimat dari audio" },
  L_SHORT:     { id: "L_SHORT",    label: "Short Answer",          short: "Short Ans", icon: "short",    color: "#A855F7", desc: "Jawab pertanyaan singkat dari audio" },
};

// ============================================================
// SAMPLE DATA — Cambridge 20 Test 1 (Reading + Listening)
// ============================================================

const SAMPLE_DATA = [
  {
    id: "cam20", book: 20, title: "Cambridge IELTS 20", type: "Academic",
    tests: [{
      id: "cam20_t1", testNumber: 1,
      reading: { passages: [
        {
          id: "cam20_t1_p1", passageNumber: 1,
          title: "The kākāpō",
          subtitle: "The kākāpō is a nocturnal, flightless parrot that is critically endangered and one of New Zealand's unique treasures",
          text: `The kākāpō, also known as the owl parrot, is a large, forest-dwelling bird, with a pale owl-like face. Up to 64 cm in length, it has predominantly yellow-green feathers, forward-facing eyes, a large grey beak, large blue feet, and relatively short wings and tail. It is the world's only flightless parrot, and is also possibly one of the world's longest-living birds, with a reported lifespan of up to 100 years. Kākāpō are solitary birds and tend to occupy the same home range for many years. They forage on the ground and climb high into trees. They often leap from trees and flap their wings, but at best manage a controlled descent to the ground. They are entirely vegetarian, with their diet including the leaves, roots and bark of trees as well as bulbs, and fern fronds.

Kākāpō breed in summer and autumn, but only in years when food is plentiful. Males play no part in incubation or chick-rearing - females alone incubate eggs and feed the chicks. The 1-4 eggs are laid in soil, which is repeatedly turned over before and during incubation. The female kākāpō has to spend long periods away from the nest searching for food, which leaves the unattended eggs and chicks particularly vulnerable to predators.

Before humans arrived, kākāpō were common throughout New Zealand's forests. However, this all changed with the arrival of the first Polynesian settlers about 700 years ago. For the early settlers, the flightless kākāpō was easy prey. They ate its meat and used its feathers to make soft cloaks. With them came the Polynesian dog and rat, which also preyed on kākāpō. By the time European colonisers arrived in the early 1800s, kākāpō had become confined to the central North Island and forested parts of the South Island. The fall in kākāpō numbers was accelerated by European colonisation. A great deal of habitat was lost through forest clearance, and introduced species such as deer depleted the remaining forests of food. Other predators such as cats, stoats and two more species of rat were also introduced. The kākāpō were in serious trouble.

In 1894, the New Zealand government launched its first attempt to save the kākāpō. Conservationist Richard Henry led an effort to relocate several hundred of the birds to predator-free Resolution Island in Fiordland. By 1995, the kākāpō population had dropped to 51 birds. In 1996, a new Recovery Plan was launched with higher funding. Renewed steps were taken to control predators on the three islands. After the first five years of the Recovery Plan, the population was on target. By June 2020, a total of 210 birds was recorded.

Today, kākāpō management continues to be guided by the kākāpō Recovery Plan. Its key goals are: minimise the loss of genetic diversity in the kākāpō population, restore or maintain sufficient habitat to accommodate the expected increase in the kākāpō population, and ensure stakeholders continue to be fully engaged in the preservation of the species.`,
          questionGroups: [
            { type: "TFNG",
              instruction: "Do the following statements agree with the information given in Reading Passage 1?",
              subInstruction: "Write TRUE if the statement agrees, FALSE if it contradicts, NOT GIVEN if no information.",
              questions: [
                { number: 1, text: "There are other parrots that share the kākāpō's inability to fly.", answer: "FALSE" },
                { number: 2, text: "Adult kākāpō produce chicks every year.", answer: "FALSE" },
                { number: 3, text: "Adult male kākāpō bring food back to nesting females.", answer: "FALSE" },
                { number: 4, text: "The Polynesian rat was a greater threat to the kākāpō than Polynesian settlers.", answer: "NOT GIVEN" },
                { number: 5, text: "Kākāpō were transferred from Rakiura Island because they were at risk from feral cats.", answer: "TRUE" },
                { number: 6, text: "One Recovery Plan initiative was caring for struggling young birds.", answer: "TRUE" },
              ]},
            { type: "NOTE_COMPLETION",
              instruction: "Complete the notes below.",
              subInstruction: "Choose ONE WORD AND/OR A NUMBER from the passage for each answer.",
              questions: [
                { number: 7, text: "Diet consists of fern fronds, various parts of a tree and ___", answer: "bulbs" },
                { number: 8, text: "Nests are created in ___ where eggs are laid.", answer: "soil" },
                { number: 9, text: "The ___ of the kākāpō were used to make clothes.", answer: "feathers" },
                { number: 10, text: "European colonisers introduced ___ which ate the kākāpō's food sources.", answer: "deer" },
                { number: 11, text: "Female kākāpō on Rakiura confirmed in year ___", answer: "1980" },
                { number: 12, text: "Recovery Plan included an increase in ___", answer: "funding" },
                { number: 13, text: "Maintain involvement of ___ in kākāpō protection.", answer: "stakeholders" },
              ]},
          ],
        },
        {
          id: "cam20_t1_p2", passageNumber: 2,
          title: "Bringing back the elm",
          subtitle: "Mark Rowe investigates attempts to reintroduce elms to Britain",
          text: `A The English elm was once a dominant feature of the British landscape. However, in the 1960s, a deadly disease destroyed millions of trees. Could the once-mighty elm make a comeback?

B Since Dutch elm disease arrived in Britain in the 1960s via imported logs, it has killed over 60 million of the country's mature elms. The cause is a fungus that blocks the tree's vascular system. The fungus is carried by bark beetles which burrow into the bark.

C However, pockets of elms have survived. Karen Russell, a plant pathologist at Forest Research, has been studying these survivors. Some mature trees in counties such as Cambridgeshire are hundreds of years old and have mysteriously escaped the epidemic.

D Russell asks: 'What are the reasons for their survival? Avoidance, tolerance, or resistance? Since spraying chemicals is impractical, we are exploring genetic approaches.'

E Matt Elliot, a conservation officer at the Woodland Trust, has been working to raise the profile of the elm. He says: 'When people imagine restoring the elm, they think of native species. In reality, native elms are now extremely rare, so any reintroduction will involve new hybrid varieties bred for disease resistance.'

F Any prospect of the elm returning relies heavily on trees being resistant to the disease. A new generation of seedlings have been bred and tested by injecting fungal spores into the bark.

G Elms have several qualities making them ideal for urban planting. Their roots rarely damage pavements, they tolerate air pollution well, and they provide excellent shade. They were traditionally used in furniture-making, for oak flooring, and as the keel of boats.`,
          questionGroups: [
            { type: "MATCHING_INFO",
              instruction: "Reading Passage 2 has seven sections, A-G. Which section contains the following information?",
              subInstruction: "NB You may use any letter more than once.",
              questions: [
                { number: 14, text: "a reference to how the elm disease is transmitted", answer: "B" },
                { number: 15, text: "examples of practical uses of elm wood", answer: "G" },
                { number: 16, text: "research into survivors of the disease", answer: "C" },
                { number: 17, text: "the number of elms killed by the disease", answer: "B" },
                { number: 18, text: "a description of how the disease was brought to Britain", answer: "B" },
              ]},
            { type: "MATCHING_FEATURES",
              instruction: "Match each statement with the correct person, A or B.",
              options: [{ label: "A", value: "Matt Elliot" }, { label: "B", value: "Karen Russell" }],
              questions: [
                { number: 19, text: "Efforts are being made to understand genetic characteristics of disease-resistant trees.", answer: "B" },
                { number: 20, text: "Plans to restore elms will require non-native varieties.", answer: "A" },
                { number: 21, text: "Research into why some elms survived.", answer: "B" },
                { number: 22, text: "It is not feasible to use chemical treatments.", answer: "B" },
                { number: 23, text: "Public awareness needs to be increased.", answer: "A" },
              ]},
            { type: "SENTENCE_COMPLETION",
              instruction: "Complete the sentences below.",
              subInstruction: "Choose ONE WORD ONLY from the passage for each answer.",
              questions: [
                { number: 24, text: "Elms were traditionally used in furniture-making and more recently for ___ flooring.", answer: "oak" },
                { number: 25, text: "Elms provide excellent ___ in urban areas.", answer: "shade" },
                { number: 26, text: "Elms were used as the ___ of boats.", answer: "keel" },
              ]},
          ],
        },
        {
          id: "cam20_t1_p3", passageNumber: 3,
          title: "How stress affects our judgement",
          subtitle: "Some of the most important decisions of our lives occur while we're feeling stressed",
          text: `We often think that stress causes us to abandon careful analytical thinking in favour of quick, gut-level responses, but this is only half the story. In reality, stress changes the way we think about risks and rewards in ways that are more nuanced than the common narrative would have us believe.

Consider the firefighters. In a landmark study, Tali Sharot, a neuroscientist at University College London, tracked a group of firefighters as they alternated between calm periods in the station and tense shifts spent tackling real fires. They found that when the firefighters were relaxed between shifts, they processed positive and negative information with roughly equal weight. But when they were under stress, their response to information became asymmetric - they became hyper-vigilant to bad news. In contrast, stress didn't change how they responded to good news.

Back in our lab, we observed the same pattern in students who were told they had to give a speech in front of judges - a tried and tested way of inducing stress. Under stress, they too became better at processing warnings.

This skewed processing of information can be amplified by social media. Studies show that the emotions expressed in social media posts can affect readers' own emotions. If we observe negative posts, we will in turn create more negative posts.

Repeatedly checking your phone, according to a survey conducted by the American Psychological Association, is related to stress. In contrast, those who do not regularly check their phones report lower levels of stress.

Furthermore, research by psychologists at the University of Bradford suggests that when we read about stressful events on social media, we can experience something similar to vicarious trauma. The more we expose ourselves to such content, the more stressed we become.`,
          questionGroups: [
            { type: "MC",
              instruction: "Choose the correct letter, A, B, C or D.",
              questions: [
                { number: 27, text: "In the first paragraph, the writer introduces the topic by",
                  options: [
                    { label: "A", text: "defining commonly used terms." },
                    { label: "B", text: "describing a personal experience." },
                    { label: "C", text: "challenging a widely held assumption." },
                    { label: "D", text: "outlining the structure of the text." }],
                  answer: "C" },
                { number: 28, text: "Sharot studied firefighters because",
                  options: [
                    { label: "A", text: "their work involves alternating stressful and non-stressful periods." },
                    { label: "B", text: "she wanted to understand their career choice." },
                    { label: "C", text: "they reported high job dissatisfaction." },
                    { label: "D", text: "previous studies were contradictory." }],
                  answer: "A" },
                { number: 29, text: "Students were told to give a speech in order to",
                  options: [
                    { label: "A", text: "test their public speaking ability." },
                    { label: "B", text: "distract them from the experiment." },
                    { label: "C", text: "assess their performance." },
                    { label: "D", text: "make them feel anxious." }],
                  answer: "D" },
                { number: 30, text: "The writer mentions social media to show that",
                  options: [
                    { label: "A", text: "it helps alleviate stress." },
                    { label: "B", text: "it changed how we interact." },
                    { label: "C", text: "stress can be transferred between people." },
                    { label: "D", text: "people are becoming less sensitive to negative news." }],
                  answer: "C" }]},
            { type: "MATCHING_ENDINGS",
              instruction: "Complete each sentence with the correct ending, A-G, below.",
              endings: [
                { label: "A", text: "became less accurate in their decision-making." },
                { label: "B", text: "processed positive and negative information equally." },
                { label: "C", text: "became more aware of positive developments." },
                { label: "D", text: "is activated when there is a need to communicate danger." },
                { label: "E", text: "adjusted their expectations only in response to bad news." },
                { label: "F", text: "maintained their ability to respond to good news." },
                { label: "G", text: "became more attentive to warnings and threats." }],
              questions: [
                { number: 31, text: "When relaxed, the firefighters usually", answer: "B" },
                { number: 32, text: "When the firefighters were stressed, they", answer: "G" },
                { number: 33, text: "When told good news, firefighters always", answer: "F" },
                { number: 34, text: "Stressed students, like firefighters,", answer: "E" },
                { number: 35, text: "The human alarm system", answer: "D" }]},
            { type: "YNNG",
              instruction: "Do the following statements agree with the writer's claims?",
              subInstruction: "YES / NO / NOT GIVEN",
              questions: [
                { number: 36, text: "The tone of social media posts we make reflects what we read.", answer: "YES" },
                { number: 37, text: "Phones impact stress more than other devices.", answer: "NOT GIVEN" },
                { number: 38, text: "More social media reading makes us less able to take in information.", answer: "NO" },
                { number: 39, text: "More exposure to stressful content makes us more stressed.", answer: "YES" },
                { number: 40, text: "People who check phones less have lower stress.", answer: "YES" }]},
          ],
        },
      ]},
      listening: {
        // Audio sample (Creative Commons sample). Ganti dengan URL audio Cambridge sebenarnya saat hosting siap.
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3",
        durationMin: 30,
        sections: [
          {
            id: "cam20_t1_l1", sectionNumber: 1,
            context: "Conversation between two people in a social context — Booking a holiday rental",
            transcript: `WOMAN: Good morning, Coastal Cottages, how can I help you?
MAN: Hi, I saw your ad about the cottage in Brighton. I'd like to book it for next month.
WOMAN: Of course. Can I have your name please?
MAN: Yes, it's James Carlton. C-A-R-L-T-O-N.
WOMAN: Thank you Mr Carlton. And which dates were you interested in?
MAN: From the 14th to the 21st of May.
WOMAN: Let me check... Yes, that's available. The cost is £85 per night.
MAN: That's fine. What's included?
WOMAN: Bedding, towels, and a welcome pack with bread, milk and tea. Parking is also free.
MAN: Great. Do you accept dogs? I have a small terrier.
WOMAN: Yes, but there's an additional cleaning fee of £25.
MAN: No problem. My phone number is 07845 992 631.`,
            questionGroups: [
              { type: "L_FORM",
                instruction: "Complete the booking form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
                questions: [
                  { number: 1, text: "Customer name: James ___", answer: "Carlton" },
                  { number: 2, text: "Booking dates: 14th to ___ May", answer: "21st" },
                  { number: 3, text: "Cost per night: £___", answer: "85" },
                  { number: 4, text: "Welcome pack includes bread, milk and ___", answer: "tea" },
                  { number: 5, text: "Pet allowed: small ___", answer: "terrier" },
                  { number: 6, text: "Extra cleaning fee: £___", answer: "25" },
                  { number: 7, text: "Phone number: 07845 992 ___", answer: "631" },
                ]},
            ],
          },
          {
            id: "cam20_t1_l2", sectionNumber: 2,
            context: "Monologue in a social context — Tour guide introducing a museum",
            transcript: `Welcome to the City Heritage Museum. Today's tour will take approximately 90 minutes. We'll begin in the Roman Gallery on the ground floor, then proceed upstairs to the Medieval Hall. Please note that flash photography is not permitted in the Tudor exhibition. The gift shop closes at 5pm sharp. Toilets are located near the main entrance and on the second floor. If you wish to take a coffee break, the café on the third floor serves drinks until 4:30pm.`,
            questionGroups: [
              { type: "L_MC",
                instruction: "Choose the correct letter, A, B or C.",
                questions: [
                  { number: 8, text: "How long is the tour?",
                    options: [{ label: "A", text: "60 minutes" }, { label: "B", text: "90 minutes" }, { label: "C", text: "120 minutes" }],
                    answer: "B" },
                  { number: 9, text: "Where does the tour begin?",
                    options: [{ label: "A", text: "Tudor exhibition" }, { label: "B", text: "Medieval Hall" }, { label: "C", text: "Roman Gallery" }],
                    answer: "C" },
                  { number: 10, text: "What is NOT allowed in the Tudor exhibition?",
                    options: [{ label: "A", text: "Photography" }, { label: "B", text: "Flash photography" }, { label: "C", text: "Video recording" }],
                    answer: "B" },
                ]},
              { type: "L_NOTE",
                instruction: "Complete the notes. Write ONE WORD AND/OR A NUMBER for each answer.",
                questions: [
                  { number: 11, text: "Gift shop closes at ___ pm", answer: "5" },
                  { number: 12, text: "Café is on the ___ floor", answer: "third" },
                  { number: 13, text: "Café serves until ___", answer: "4:30pm" },
                ]},
            ],
          },
          {
            id: "cam20_t1_l3", sectionNumber: 3,
            context: "Conversation in an academic context — Two students discussing a research project",
            transcript: `EMMA: Hi Tom, how's your research project going?
TOM: Pretty well actually. I've finished collecting data from 200 participants.
EMMA: That's impressive. What was your main hypothesis again?
TOM: That sleep quality affects memory retention. I used the Pittsburgh Sleep Quality Index for measurement.
EMMA: Cool. And what software are you using for analysis?
TOM: SPSS, mostly. Dr Henderson recommended it.
EMMA: I'm using R for mine. It has a steeper learning curve but more flexibility.
TOM: True. When's your deadline?
EMMA: April 30th. You?
TOM: Same. We should book a study room together next week.`,
            questionGroups: [
              { type: "L_SENTENCE",
                instruction: "Complete the sentences. Write ONE WORD ONLY for each answer.",
                questions: [
                  { number: 14, text: "Tom collected data from ___ participants.", answer: "200" },
                  { number: 15, text: "Tom's hypothesis is about sleep quality and ___ retention.", answer: "memory" },
                  { number: 16, text: "Tom uses ___ software for analysis.", answer: "SPSS" },
                  { number: 17, text: "Emma uses ___ for her analysis.", answer: "R" },
                  { number: 18, text: "The deadline is April ___", answer: "30th" },
                ]},
              { type: "L_MATCHING",
                instruction: "Match each item with the correct person, A (Tom) or B (Emma).",
                options: [{ label: "A", value: "Tom" }, { label: "B", value: "Emma" }],
                questions: [
                  { number: 19, text: "Uses software with steeper learning curve", answer: "B" },
                  { number: 20, text: "Was advised by Dr Henderson", answer: "A" },
                ]},
            ],
          },
          {
            id: "cam20_t1_l4", sectionNumber: 4,
            context: "Monologue in an academic context — Lecture on renewable energy",
            transcript: `Today we're discussing renewable energy. Solar power has grown 400% in the last decade. Wind turbines now generate 25% of Europe's electricity. The biggest challenge is storage — current battery technology is expensive and degrades over time. Researchers are investigating hydrogen as an alternative storage medium. Geothermal energy, while underused, has enormous potential in Iceland and Indonesia. By 2050, experts predict 80% of global energy will come from renewables.`,
            questionGroups: [
              { type: "L_NOTE",
                instruction: "Complete the lecture notes. Write ONE WORD AND/OR A NUMBER for each answer.",
                questions: [
                  { number: 21, text: "Solar power growth in last decade: ___%", answer: "400" },
                  { number: 22, text: "Wind turbines generate ___% of Europe's electricity.", answer: "25" },
                  { number: 23, text: "Biggest challenge of renewables: ___", answer: "storage" },
                  { number: 24, text: "Alternative storage being researched: ___", answer: "hydrogen" },
                  { number: 25, text: "Geothermal underused but big potential in Iceland and ___", answer: "Indonesia" },
                  { number: 26, text: "By 2050, ___% of energy will be renewable.", answer: "80" },
                ]},
              { type: "L_SHORT",
                instruction: "Answer the questions. Write NO MORE THAN TWO WORDS for each answer.",
                questions: [
                  { number: 27, text: "What is the topic of today's lecture?", answer: "renewable energy" },
                  { number: 28, text: "What degrades over time in current battery tech?", answer: "battery" },
                  { number: 29, text: "Which year is the prediction for?", answer: "2050" },
                  { number: 30, text: "Name one country with geothermal potential.", answer: "Iceland" },
                ]},
            ],
          },
        ],
      },
    }],
  },
  {
    id: "cam19", book: 19, title: "Cambridge IELTS 19", type: "Academic",
    tests: [{
      id: "cam19_t1", testNumber: 1,
      reading: { passages: [
        {
          id: "cam19_t1_p1", passageNumber: 1,
          title: "How tennis rackets have changed",
          subtitle: "",
          text: `In 2016, the British professional tennis player Andy Murray was ranked as the world's number one. It was an incredible achievement by any standard — made even more remarkable by the fact that he did this during a period considered to be one of the strongest in the sport's history, competing against the likes of Rafael Nadal, Roger Federer and Novak Djokovic, to name just a few. Yet five years previously, he had been regarded as a talented outsider who entered but never won the major tournaments.

  Of the changes that account for this transformation, one was visible and widely publicised: in 2011, Murray invited former number one player Ivan Lendl onto his coaching team — a valuable addition that had a visible impact on the player's playing style. Another change was so subtle as to pass more or less unnoticed. Like many players, Murray has long preferred a racket that consists of two types of string: one for the mains (verticals) and another for the crosses (horizontals). While he continued to use natural string in the crosses, in 2012 he switched to a synthetic string for the mains. A small change, perhaps, but its importance should not be underestimated.

  The modification that Murray made is just one of a number of options available to players looking to tweak their rackets in order to improve their games. 'Touring professionals have their rackets customised to their specific needs,' says Colin Triplow, a UK-based professional racket stringer. 'It's a highly important part of performance maximisation.' Consequently, the specific rackets used by the world's elite are not actually readily available to the public; rather, each racket is individually made to suit the player who uses it. Take the US professional tennis players Mike and Bob Bryan, for example: 'We're very particular with our racket specifications,' they say. 'All our rackets are sent from our manufacturer to Tampa, Florida, where our frames go through a... thorough customisation process.' They explain how they have adjusted not only racket length, but even experimented with different kinds of paint. The rackets they use now weigh more than the average model and also have a denser string pattern (i.e. more crosses and mains).

  The primary reason for these modifications is simple: as the line between winning and losing becomes thinner and thinner, even these slight changes become more and more important. As a result, players and their teams are becoming increasingly creative with the modifications to their rackets as they look to maximise their competitive advantage.

  Racket modifications mainly date back to the 1970s, when the amateur German tennis player Werner Fischer started playing with the so-called spaghetti-strung racket. It created a string bed that generated so much topspin that it was quickly banned by the International Tennis Federation. However, within a decade or two, racket modification became a regularity. Today it is, in many ways, an aspect of the game that is equal in significance to nutrition or training.

  Modifications can be divided into two categories: those to the string bed and those to the racket frame. The former is far more common than the latter: the choice of the strings and the tension with which they are installed is something that nearly all professional players experiment with. They will continually change it depending on various factors including the court surface, climatic conditions, and game styles. Some will even change it depending on how they feel at the time.

  At one time, all tennis rackets were strung with natural gut made from the outer layer of sheep or cow intestines. This all changed in the early 1990s with the development of synthetic strings that were cheaper and more durable. They are made from three materials: nylon (relatively durable and affordable), Kevlar (too stiff to be used alone) or co-polyester (polyester combined with additives that enhance its performance). Even so, many professional players continue to use a 'hybrid set-up', where a combination of both synthetic and natural strings are used.

  Of the synthetics, co-polyester is by far the most widely used. It's a perfect fit for the style of tennis now played, where players tend to battle it out from the back of the court rather than coming to the net. Studies indicate that the average spin from a co-polyester string is 25% greater than that from natural string or other synthetics. In a sense, the development of co-polyester strings has revolutionised the game.

  However, many players go beyond these basic adjustments to the strings and make changes to the racket frame itself. For example, much of the serving power of US professional player Pete Sampras was attributed to the addition of four to five lead weights onto his rackets, and today many professionals have the weight adjusted during the manufacturing process.

  Other changes to the frame involve the handle. Players have individual preferences for the shape of the handle and some will have the handle of one racket moulded onto the frame of a different racket. Other players make different changes. The professional Portuguese player Gonçalo Oliveira replaced the original grips of his rackets with something thinner because they had previously felt uncomfortable to hold.

  Racket customisation and modification have pushed the standards of the game to greater levels that few could have anticipated in the days of natural strings and heavy, wooden frames, and it's exciting to see what further developments there will be in the future.`,
          questionGroups: [
            { type: "TFNG",
              instruction: "Do the following statements agree with the information given in Reading Passage 1?",
              subInstruction: "Write TRUE if the statement agrees, FALSE if it contradicts, NOT GIVEN if there is no information.",
              questions: [
                { number: 1, text: "People had expected Andy Murray to become the world's top tennis player for at least five years before 2016.", answer: "FALSE" },
                { number: 2, text: "The change that Andy Murray made to his rackets attracted a lot of attention.", answer: "FALSE" },
                { number: 3, text: "Most of the world's top players take a professional racket stringer on tour with them.", answer: "NOT GIVEN" },
                { number: 4, text: "Mike and Bob Bryan use rackets that are light in comparison to the majority of rackets.", answer: "FALSE" },
                { number: 5, text: "Werner Fischer played with a spaghetti-strung racket that he designed himself.", answer: "NOT GIVEN" },
                { number: 6, text: "The weather can affect how professional players adjust the strings on their rackets.", answer: "TRUE" },
                { number: 7, text: "It was believed that the change Pete Sampras made to his rackets contributed to his strong serve.", answer: "TRUE" },
              ]},
            { type: "NOTE_COMPLETION",
              instruction: "Complete the notes below.",
              subInstruction: "Choose ONE WORD ONLY from the passage for each answer.",
              questions: [
                { number: 8, text: "Mike and Bob Bryan made changes to the types of ___ used on their racket frames.", answer: "paint" },
                { number: 9, text: "Players were not allowed to use the spaghetti-strung racket because of the amount of ___ it created.", answer: "topspin" },
                { number: 10, text: "Changes to rackets can be regarded as being as important as players' diets or ___ they do.", answer: "training" },
                { number: 11, text: "All rackets used to have natural strings made from the ___ of animals.", answer: "intestines" },
                { number: 12, text: "Pete Sampras had metal ___ put into the frames of his rackets.", answer: "weights" },
                { number: 13, text: "Gonçalo Oliveira changed the ___ on his racket handles.", answer: "grips" },
              ]},
          ],
        },
        {
          id: "cam19_t1_p2", passageNumber: 2,
          title: "The pirates of the ancient Mediterranean",
          subtitle: "In the first and second millennia BCE, pirates sailed around the Mediterranean, attacking ships and avoiding pursuers",
          text: `A When one mentions pirates, an image springs to most people's minds of a crew of misfits, daredevils and adventurers in command of a tall sailing ship in the Caribbean Sea. Yet from the first to the third millennium BCE, thousands of years before these swashbucklers began spreading fear across the Caribbean, pirates prowled the Mediterranean, raiding merchant ships and threatening vital trade routes. However, despite all efforts and the might of various ancient states, piracy could not be stopped. The situation remained unchanged for thousands of years. Only when the pirates directly threatened the interests of ancient Rome did the Roman Republic organise a massive fleet to eliminate piracy. Under the command of the Roman general Pompey, Rome eradicated piracy, transforming the Mediterranean into 'Mare Nostrum' (Our Sea).

  B Although piracy in the Mediterranean is first recorded in ancient Egypt during the reign of Pharaoh Amenhotep III (c 1390–1353 BCE), it is reasonable to assume it predated this powerful civilisation. This is partly due to the great importance the Mediterranean held at this time, and partly due to its geography. While the Mediterranean region is predominantly fertile, some parts are rugged and hilly, even mountainous. In the ancient times, the inhabitants of these areas relied heavily on marine resources, including fish and salt. Most had their own boats, possessed good seafaring skills, and unsurpassed knowledge of the local coastline and sailing routes. Thus, it is not surprising that during hardships, these men turned to piracy. Geography itself further benefited the pirates, with the numerous coves along the coast providing places for them to hide their boats and strike undetected. Before the invention of ocean-going caravels in the 15th century, ships could not easily cross long distances over open water. Thus, in the ancient world most were restricted to a few well-known navigable routes that followed the coastline. Caught in a trap, a slow merchant ship laden with goods had no other option but to surrender. In addition, knowledge of the local area helped the pirates to avoid retaliation once a state fleet arrived.

  C One should also add that it was not unknown in the first and second millennia BCE for governments to resort to pirates' services, especially during wartime, employing their skills and numbers against their opponents. A pirate fleet would serve in the first wave of attack, preparing the way for the navy. Some of the regions were known for providing safe harbours to pirates, who, in return, boosted the local economy.

  D The first known record of a named group of Mediterranean pirates, made during the rule of ancient Egyptian Pharaoh Akhenaten (c 1353–1336 BCE), was in the Amarna Letters. These were extracts of diplomatic correspondence between the pharaoh and his allies, and covered many pressing issues, including piracy. It seems the pharaoh was troubled by two distinct pirate groups, the Lukka and the Sherden. Despite the Egyptian fleet's best efforts, the pirates continued to cause substantial disruption to regional commerce. In the letters, the king of Alashiya (modern Cyprus) rejected Akhenaten's claims of a connection with the Lukka (based in modern-day Turkey). The king assured Akhenaten he was prepared to punish any of his subjects involved in piracy.

  E The ancient Greek world's experience of piracy was different from that of Egyptian rulers. While Egypt's power was land-based, the ancient Greeks relied on the Mediterranean in almost all aspects of life, from trade to warfare. Interestingly, in his works the Iliad and the Odyssey, the ancient Greek writer Homer not only condones, but praises the lifestyle and actions of pirates. The opinion remained unchanged in the following centuries. The ancient Greek historian Thucydides, for instance, glorified pirates' daring attacks on ships or even cities. For Greeks, piracy was a part of everyday life. Even high-ranking members of the state were not beyond engaging in such activities. According to the Greek orator Demosthenes, in 355 BCE, Athenian ambassadors made a detour from their official travel to capture a ship sailing from Egypt, taking the wealth found onboard for themselves!

  F The Greeks' liberal approach towards piracy does not mean they always tolerated it, but attempts to curtail piracy were hampered by the large number of pirates operating in the Mediterranean.

  G The rising power of ancient Rome required the Roman Republic to deal with piracy in the Mediterranean. While piracy was a serious issue for the Republic, Rome profited greatly from its existence. Pirate raids provided a steady source of slaves, essential for Rome's agriculture and mining industries. But this arrangement could work only while the pirates left Roman interests alone. Pirate attacks on grain ships, which were essential to Roman citizens, led to angry voices in the Senate, demanding punishment of the culprits. Rome, however, did nothing, further encouraging piracy. By the 1st century BCE, emboldened pirates kidnapped prominent Roman dignitaries, asking for a large ransom to be paid. Their most famous hostage was none other than Julius Caesar, captured in 75 BCE. By now, Rome was well aware that pirates had outlived their usefulness. The time had come for concerted action. In 67 BCE, a new law granted Pompey vast funds to combat the Mediterranean menace. Taking personal command, Pompey divided the entire Mediterranean into 13 districts, assigning a fleet and commander to each. After cleansing one district of pirates, the fleet would join another in the next district. The process continued until the entire Mediterranean was free of pirates. Although thousands of pirates died at the hands of Pompey's troops, as a long-term solution to the problem, many more were offered land in fertile areas located far from the sea. Instead of a maritime menace, Rome got productive farmers that further boosted its economy.`,
          questionGroups: [
            { type: "MATCHING_INFO",
              instruction: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information?",
              subInstruction: "NB You may use any letter more than once.",
              questions: [
                { number: 14, text: "a reference to a denial of involvement in piracy", answer: "D" },
                { number: 15, text: "details of how a campaign to eradicate piracy was carried out", answer: "G" },
                { number: 16, text: "a mention of the circumstances in which states in the ancient world would make use of pirates", answer: "C" },
                { number: 17, text: "a reference to how people today commonly view pirates", answer: "A" },
                { number: 18, text: "an explanation of how some people were encouraged not to return to piracy", answer: "G" },
                { number: 19, text: "a mention of the need for many sailing vessels to stay relatively close to land", answer: "B" },
              ]},
            { type: "LIST_OPTIONS",
              instruction: "Choose TWO letters, A–E. Which TWO of the following statements does the writer make about inhabitants of the Mediterranean region in the ancient world?",
              options: [
                { label: "A", text: "They often used stolen vessels to carry out pirate attacks." },
                { label: "B", text: "They managed to escape capture by the authorities because they knew the area so well." },
                { label: "C", text: "They paid for information about the routes merchant ships would take." },
                { label: "D", text: "They depended more on the sea for their livelihood than on farming." },
                { label: "E", text: "They stored many of the goods taken in pirate attacks in coves along the coastline." },
              ],
              questions: [
                { number: 20, text: "First answer (either order)", answer: "B" },
                { number: 21, text: "Second answer (either order)", answer: "D" },
              ]},
            { type: "LIST_OPTIONS",
              instruction: "Choose TWO letters, A–E. Which TWO of the following statements does the writer make about piracy and ancient Greece?",
              options: [
                { label: "A", text: "The state estimated that very few people were involved in piracy." },
                { label: "B", text: "Attitudes towards piracy changed shortly after the Iliad and the Odyssey were written." },
                { label: "C", text: "Important officials were known to occasionally take part in piracy." },
                { label: "D", text: "Every citizen regarded pirate attacks on cities as unacceptable." },
                { label: "E", text: "A favourable view of piracy is evident in certain ancient Greek texts." },
              ],
              questions: [
                { number: 22, text: "First answer (either order)", answer: "C" },
                { number: 23, text: "Second answer (either order)", answer: "E" },
              ]},
            { type: "SUMMARY_COMPLETION",
              instruction: "Complete the summary below.",
              subInstruction: "Choose ONE WORD ONLY from the passage for each answer.",
              questions: [
                { number: 24, text: "Attacks on vessels transporting ___ to Rome resulted in calls for punishment for the pirates responsible.", answer: "grain" },
                { number: 25, text: "... resulted in calls for ___ for the pirates responsible.", answer: "punishment" },
                { number: 26, text: "Some pirates demanded a ___ for the return of the Roman officials they captured.", answer: "ransom" },
              ]},
          ],
        },
        {
          id: "cam19_t1_p3", passageNumber: 3,
          title: "The persistence and peril of misinformation",
          subtitle: "Brian Southwell looks at how human brains verify information and discusses some of the challenges of battling widespread falsehoods",
          text: `Misinformation — both deliberately promoted and accidentally shared — is perhaps an inevitable part of the world in which we live, but it is not a new problem. People likely have lied to one another for roughly as long as verbal communication has existed. Deceiving others can offer an apparent opportunity to gain strategic advantage, to motivate others to action, or even to protect interpersonal bonds. Moreover, people inadvertently have been sharing inaccurate information with one another for thousands of years.

  However, we currently live in an era in which technology enables information to reach large audiences distributed across the globe, and thus the potential for immediate and widespread effects from misinformation now looms larger than in the past. Yet the means to correct misinformation might, over time, be found in those same patterns of mass communication and of the facilitated spread of information.

  The main worry regarding misinformation is its potential to unduly influence attitudes and behavior, leading people to think and act differently than they would if they were correctly informed, as suggested by the research teams of Stephan Lewandowsky of the University of Bristol and Elizabeth Marsh of Duke University, among others. In other words, we worry that misinformation might lead people to hold misperceptions (or false beliefs) and that these misperceptions, especially when they occur among large groups of people, may have detrimental, downstream consequences for health, social harmony, and the political climate.

  At least three observations related to misinformation in the contemporary mass-media environment warrant the attention of researchers, policy makers, and really everyone who watches television, listens to the radio, or reads information online. First of all, people who encounter misinformation tend to believe it, at least initially. Secondly, electronic and print media often do not block many types of misinformation before it appears in content available to large audiences. Thirdly, countering misinformation once it has enjoyed wide exposure can be a resource-intensive effort.

  Knowing what happens when people initially encounter misinformation holds tremendous importance for estimating the potential for subsequent problems. Although it is fairly routine for individuals to come across information that is false, the question of exactly how — and when — we mentally label information as true or false has garnered philosophical debate. The dilemma is neatly summarized by a contrast between how the 17th-century philosophers René Descartes and Baruch Spinoza described human information engagement, with conflicting predictions that only recently have been empirically tested in robust ways. Descartes argued that a person only accepts or rejects information after considering its truth or falsehood; Spinoza argued that people accept all encountered information (or misinformation) by default and then subsequently verify or reject it through a separate cognitive process. In recent decades, empirical evidence from the research teams of Erik Asp of the University of Chicago and Daniel Gilbert at Harvard University, among others, has supported Spinoza's account: people appear to encode all new information as if it were true, even if only momentarily, and later tag the information as being either true or false, a pattern that seems consistent with the observation that mental resources for skepticism physically reside in a different part of the brain than the resources used in perceiving and encoding.

  What about our second observation that misinformation often can appear in electronic or print media without being preemptively blocked? In support of this, one might consider the nature of regulatory structures in the United States: regulatory agencies here tend to focus on post hoc detection of broadcast information. Organizations such as the Food and Drug Administration (FDA) offer considerable monitoring and notification functions, but these roles typically do not involve preemptive censoring. The FDA oversees direct-to-consumer prescription drug advertising, for example, and has developed mechanisms such as the 'Bad Ad' program, through which people can report advertising in apparent violation of FDA guidelines on drug risks. Such programs, although laudable and useful, do not keep false advertising off the airwaves. In addition, even misinformation that is successfully corrected can continue to affect attitudes.

  This leads us to our third observation: a campaign to correct misinformation, even if rhetorically compelling, requires resources and planning to accomplish necessary reach and frequency. For corrective campaigns to be persuasive, audiences need to be able to comprehend them, which requires either effort to frame messages in ways that are accessible or effort to educate and sensitize audiences to the possibility of misinformation. That some audiences might be unaware of the potential for misinformation also suggests the utility of media literacy efforts as early as elementary school. Even with journalists and scholars pointing to the phenomenon of 'fake news', people do not distinguish between demonstrably false stories and those based in fact when scanning and processing written information.

  We live at a time when widespread misinformation is common. Yet at this time many people also are passionately developing potential solutions and remedies. The journey forward undoubtedly will be a long and arduous one. Future remedies will require not only continued theoretical consideration but also the development and maintenance of consistent monitoring tools — and a recognition among fellow members of society that claims which find prominence in the media that are insufficiently based in scientific consensus and social reality should be countered. Misinformation arises as a result of human fallibility and human information needs. To overcome the worst effects of the phenomenon, we will need coordinated efforts over time, rather than any singular one-time panacea we could hope to offer.`,
          questionGroups: [
            { type: "MC",
              instruction: "Choose the correct letter, A, B, C or D.",
              questions: [
                { number: 27, text: "What point does the writer make about misinformation in the first paragraph?",
                  options: [
                    { label: "A", text: "Misinformation is a relatively recent phenomenon." },
                    { label: "B", text: "Some people find it easy to identify misinformation." },
                    { label: "C", text: "Misinformation changes as it is passed from one person to another." },
                    { label: "D", text: "There may be a number of reasons for the spread of misinformation." }],
                  answer: "D" },
                { number: 28, text: "What does the writer say about the role of technology?",
                  options: [
                    { label: "A", text: "It may at some point provide us with a solution to misinformation." },
                    { label: "B", text: "It could fundamentally alter the way in which people regard information." },
                    { label: "C", text: "It has changed the way in which organisations use misinformation." },
                    { label: "D", text: "It has made it easier for people to check whether information is accurate." }],
                  answer: "A" },
                { number: 29, text: "What is the writer doing in the fourth paragraph?",
                  options: [
                    { label: "A", text: "comparing the different opinions people have of misinformation" },
                    { label: "B", text: "explaining how the effects of misinformation have changed over time" },
                    { label: "C", text: "outlining which issues connected with misinformation are significant today" },
                    { label: "D", text: "describing the attitude of policy makers towards misinformation in the media" }],
                  answer: "C" },
                { number: 30, text: "What point does the writer make about regulation in the USA?",
                  options: [
                    { label: "A", text: "The guidelines issued by the FDA need to be simplified." },
                    { label: "B", text: "Regulation does not affect people's opinions of new prescription drugs." },
                    { label: "C", text: "The USA has more regulatory bodies than most other countries." },
                    { label: "D", text: "Regulation fails to prevent misinformation from appearing in the media." }],
                  answer: "D" },
              ]},
            { type: "SUMMARY_COMPLETION",
              instruction: "Complete the summary using the list of phrases, A–J, below.",
              options: [
                { label: "A", text: "constant conflict" },
                { label: "B", text: "additional evidence" },
                { label: "C", text: "different locations" },
                { label: "D", text: "experimental subjects" },
                { label: "E", text: "short period" },
                { label: "F", text: "extreme distrust" },
                { label: "G", text: "frequent exposure" },
                { label: "H", text: "mental operation" },
                { label: "I", text: "dubious reason" },
                { label: "J", text: "different ideas" },
              ],
              questions: [
                { number: 31, text: "Although people have ___ to misinformation, there is debate about precisely how and when we label something as true or untrue.", answer: "G" },
                { number: 32, text: "The philosophers Descartes and Spinoza had ___ about how people engage with information.", answer: "J" },
                { number: 33, text: "Spinoza believed that a distinct ___ is involved in these stages.", answer: "H" },
                { number: 34, text: "Recent research has provided ___ for Spinoza's theory.", answer: "B" },
                { number: 35, text: "People accept all encountered information as if it were true, even if this is for an extremely ___.", answer: "E" },
                { number: 36, text: "The resources for scepticism and the resources for perceiving and encoding are in ___ in the brain.", answer: "C" },
              ]},
            { type: "YNNG",
              instruction: "Do the following statements agree with the claims of the writer in Reading Passage 3?",
              subInstruction: "Write YES if it agrees, NO if it contradicts, NOT GIVEN if impossible to say.",
              questions: [
                { number: 37, text: "Campaigns designed to correct misinformation will fail to achieve their purpose if people are unable to understand them.", answer: "YES" },
                { number: 38, text: "Attempts to teach elementary school students about misinformation have been opposed.", answer: "NOT GIVEN" },
                { number: 39, text: "It may be possible to overcome the problem of misinformation in a relatively short period.", answer: "NO" },
                { number: 40, text: "The need to keep up with new information is hugely exaggerated in today's world.", answer: "NOT GIVEN" },
              ]},
          ],
        },
      ]},
      // listening: { ... } — TODO: to be added later
    }],
  },
];

// Combine reading + listening type maps for lookups
const ALL_TYPES = { ...QUESTION_TYPES, ...LISTENING_TYPES };

// ============================================================
// AUTH & KEYS SYSTEM (localStorage-based)
// ============================================================

const STORAGE_KEY = "ielts_practice_user";
const HISTORY_KEY = "ielts_practice_history";
const DAILY_KEYS = 2;

function getToday() { return new Date().toISOString().split('T')[0]; }
function daysBetween(d1, d2) {
  const ms = new Date(d2) - new Date(d1);
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function loadUser() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw);
    if (user.lastReset !== getToday() && !user.unlimited) {
      user.keys = DAILY_KEYS;
      user.lastReset = getToday();
      saveUser(user);
    }
    return user;
  } catch { return null; }
}
function saveUser(u) {
  if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
}
function clearUser() {
  if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
}

function loadHistory() {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch { return []; }
}
function saveHistoryEntry(entry) {
  if (typeof window === 'undefined') return;
  const list = loadHistory();
  list.unshift({ ...entry, completedAt: new Date().toISOString() });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 100)));
}
function clearHistory() {
  if (typeof window !== 'undefined') localStorage.removeItem(HISTORY_KEY);
}

function computeStreak(history) {
  if (!history.length) return 0;
  const days = [...new Set(history.map(h => h.completedAt.split('T')[0]))].sort().reverse();
  if (!days.length) return 0;
  const today = getToday();
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (days[0] !== today && days[0] !== yesterday) return 0;
  let streak = 1;
  for (let i = 1; i < days.length; i++) {
    if (daysBetween(days[i], days[i-1]) === 1) streak++;
    else break;
  }
  return streak;
}

// ============================================================
// STYLES
// ============================================================

const styles = {
  app: { minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#e2e8f0" },
  nav: { background: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(148, 163, 184, 0.1)", padding: "0 24px", position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 },
  logo: { display: "flex", alignItems: "center", gap: 12, cursor: "pointer" },
  logoIcon: { width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "white" },
  logoText: { fontSize: 20, fontWeight: 700, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  container: { maxWidth: 1200, margin: "0 auto", padding: "32px 24px" },
  card: { background: "rgba(30, 41, 59, 0.6)", borderRadius: 16, border: "1px solid rgba(148, 163, 184, 0.1)", backdropFilter: "blur(10px)", overflow: "hidden" },
  button: { padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, transition: "all 0.2s ease", display: "inline-flex", alignItems: "center", gap: 8 },
  primaryButton: { background: "linear-gradient(135deg, #3B82F6, #2563EB)", color: "white" },
  secondaryButton: { background: "rgba(148, 163, 184, 0.1)", color: "#94a3b8", border: "1px solid rgba(148, 163, 184, 0.2)" },
  badge: { padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 },
  modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 },
  modalContent: { background: "linear-gradient(135deg, #1e293b, #0f172a)", borderRadius: 20, border: "1px solid rgba(148, 163, 184, 0.15)", padding: 32, maxWidth: 480, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" },
};

function Badge({ color, children, icon }) {
  return <span style={{ ...styles.badge, background: `${color}20`, color }}>{icon}{children}</span>;
}

// ============================================================
// AUTH MODAL (Google login simulation)
// ============================================================

function LoginModal({ onLogin, onClose }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleGoogleLogin = () => {
    // Simulasi: dalam produksi, gunakan Google Identity Services
    // <script src="https://accounts.google.com/gsi/client" async></script>
    // Lalu integrasikan google.accounts.id.initialize / prompt
    const demoUser = {
      email: email || "demo.user@gmail.com",
      name: name || "Demo User",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "Demo User")}&background=3B82F6&color=fff`,
      keys: DAILY_KEYS,
      lastReset: getToday(),
      unlimited: false,
      joinedAt: new Date().toISOString(),
    };
    saveUser(demoUser);
    onLogin(demoUser);
  };

  return (
    <div style={styles.modal} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 28, fontWeight: 800, color: "white" }}>IE</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Selamat Datang!</h2>
          <p style={{ color: "#94a3b8", fontSize: 14 }}>Login untuk dapat 2 kunci gratis setiap hari</p>
        </div>

        <div style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 10, padding: 12, marginBottom: 20, fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>
          <strong style={{ color: "#3B82F6" }}>Demo Mode:</strong> Login asli butuh setup Google OAuth. Untuk sekarang, isi nama & email simulasi atau klik Continue.
        </div>

        <div style={{ marginBottom: 12 }}>
          <input type="text" placeholder="Nama (opsional)" value={name} onChange={e => setName(e.target.value)}
            style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(148,163,184,0.2)", background: "rgba(15,23,42,0.6)", color: "#e2e8f0", fontSize: 14, outline: "none" }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <input type="email" placeholder="Email (opsional)" value={email} onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(148,163,184,0.2)", background: "rgba(15,23,42,0.6)", color: "#e2e8f0", fontSize: 14, outline: "none" }} />
        </div>

        <button onClick={handleGoogleLogin}
          style={{ width: "100%", padding: "14px 20px", borderRadius: 12, border: "1px solid rgba(148,163,184,0.2)", background: "white", color: "#1e293b", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
          <Icon name="google" size={20} />
          Continue with Google
        </button>

        <p style={{ fontSize: 11, color: "#64748b", textAlign: "center", marginTop: 16, lineHeight: 1.5 }}>
          Dengan login, kamu setuju dengan terms of service.<br/>Data disimpan lokal di browser-mu (untuk demo).
        </p>
      </div>
    </div>
  );
}

// ============================================================
// DONATE MODAL
// ============================================================

function DonateModal({ user, onClose, onUnlock }) {
  const [amount, setAmount] = useState(10000);
  const [custom, setCustom] = useState("");
  const presets = [5000, 10000, 25000, 50000, 100000];

  const handleDonate = () => {
    const finalAmount = custom ? parseInt(custom) : amount;
    // Simulasi pembayaran berhasil
    setTimeout(() => {
      const updated = { ...user, unlimited: true, donatedAt: new Date().toISOString(), donatedAmount: finalAmount };
      saveUser(updated);
      onUnlock(updated);
      alert(`Terima kasih atas donasi Rp ${finalAmount.toLocaleString('id-ID')}! Kunci unlimited sudah aktif.`);
    }, 500);
  };

  return (
    <div style={styles.modal} onClick={onClose}>
      <div style={{ ...styles.modalContent, maxWidth: 520 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, background: "linear-gradient(135deg, #F59E0B, #EF4444)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 32 }}>🔓</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Unlock Unlimited</h2>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>Donasi seikhlasnya untuk akses unlimited kunci<br/>(bayar berapa saja, support pengembangan)</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
          {presets.map(p => (
            <button key={p} onClick={() => { setAmount(p); setCustom(""); }}
              style={{ padding: "14px 8px", borderRadius: 10, border: amount === p && !custom ? "2px solid #F59E0B" : "1px solid rgba(148,163,184,0.2)",
                background: amount === p && !custom ? "rgba(245,158,11,0.15)" : "rgba(15,23,42,0.4)",
                color: amount === p && !custom ? "#F59E0B" : "#94a3b8", cursor: "pointer", fontSize: 13, fontWeight: 700, transition: "all 0.15s" }}>
              Rp {(p/1000)}k
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 6 }}>Atau nominal lain (Rp)</label>
          <input type="number" placeholder="Custom amount" value={custom}
            onChange={e => setCustom(e.target.value)}
            style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(148,163,184,0.2)", background: "rgba(15,23,42,0.6)", color: "#e2e8f0", fontSize: 14, outline: "none" }} />
        </div>

        <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10, padding: 14, marginBottom: 20, fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>
          <strong style={{ color: "#F59E0B" }}>Demo:</strong> Pembayaran asli butuh integrasi Midtrans/Stripe/QRIS. Untuk sekarang, klik tombol di bawah untuk simulate pembayaran berhasil & aktifkan unlimited.
        </div>

        <button onClick={handleDonate}
          style={{ width: "100%", padding: "16px 20px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #F59E0B, #EF4444)", color: "white", fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
          Donate Rp {(custom ? parseInt(custom) : amount).toLocaleString('id-ID')} & Unlock Unlimited
        </button>

        <button onClick={onClose}
          style={{ width: "100%", padding: "10px", marginTop: 8, background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontSize: 13 }}>
          Nanti saja
        </button>
      </div>
    </div>
  );
}

// ============================================================
// USER MENU & KEY DISPLAY
// ============================================================

function UserMenu({ user, onLogout, onDonate }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)}
        style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 12px 6px 6px", borderRadius: 24, border: "1px solid rgba(148,163,184,0.15)", background: "rgba(30,41,59,0.6)", cursor: "pointer", color: "#e2e8f0" }}>
        <img src={user.avatar} alt="" style={{ width: 32, height: 32, borderRadius: "50%" }} />
        <span style={{ fontSize: 13, fontWeight: 600 }}>{user.name}</span>
      </button>
      {open && (
        <div style={{ position: "absolute", top: 50, right: 0, minWidth: 240, background: "rgba(15,23,42,0.95)", backdropFilter: "blur(20px)", border: "1px solid rgba(148,163,184,0.15)", borderRadius: 12, padding: 8, boxShadow: "0 10px 40px rgba(0,0,0,0.5)", zIndex: 50 }}>
          <div style={{ padding: "10px 12px", borderBottom: "1px solid rgba(148,163,184,0.1)" }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{user.name}</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>{user.email}</div>
          </div>
          <div style={{ padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
              <Icon name="key" size={14} color="#F59E0B" />
              <span>Kunci tersisa</span>
            </div>
            <strong style={{ color: user.unlimited ? "#10B981" : "#F59E0B" }}>{user.unlimited ? "∞" : user.keys}</strong>
          </div>
          {!user.unlimited && (
            <button onClick={() => { setOpen(false); onDonate(); }}
              style={{ width: "100%", padding: "10px 12px", marginTop: 4, borderRadius: 8, border: "none", background: "linear-gradient(135deg, #F59E0B, #EF4444)", color: "white", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
              🔓 Unlock Unlimited
            </button>
          )}
          <button onClick={() => { setOpen(false); onLogout(); }}
            style={{ width: "100%", padding: "10px 12px", marginTop: 4, borderRadius: 8, border: "none", background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: 13, textAlign: "left" }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

function KeyDisplay({ user, onClick }) {
  return (
    <button onClick={onClick}
      style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 20, border: "1px solid rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.1)", cursor: "pointer", color: "#F59E0B", fontSize: 13, fontWeight: 700 }}>
      <Icon name="key" size={14} />
      {user.unlimited ? "Unlimited" : `${user.keys} kunci`}
    </button>
  );
}

// ============================================================
// AUDIO PLAYER (Listening)
// ============================================================

function AudioPlayer({ src, autoPlay = false, onEnded }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => { setProgress(a.currentTime); setDuration(a.duration || 0); };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onErr = () => setError(true);
    const onEnd = () => { setPlaying(false); onEnded?.(); };
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('error', onErr);
    a.addEventListener('ended', onEnd);
    if (autoPlay) a.play().catch(() => {});
    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('error', onErr);
      a.removeEventListener('ended', onEnd);
    };
  }, [src]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.pause(); else a.play().catch(() => setError(true));
  };
  const fmt = (s) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(Math.floor(s%60)).padStart(2,"0")}`;
  const pct = duration ? (progress / duration) * 100 : 0;

  return (
    <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.08))", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 14, padding: 16, marginBottom: 16 }}>
      <audio ref={audioRef} src={src} preload="auto" />
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={toggle} disabled={error}
          style={{ width: 52, height: 52, borderRadius: "50%", border: "none", background: error ? "#475569" : "linear-gradient(135deg, #10B981, #059669)", color: "white", cursor: error ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(16,185,129,0.3)" }}>
          <Icon name={playing ? "pause" : "play"} size={20} color="white" />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Icon name="headphones" size={14} color="#10B981" />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#10B981" }}>Listening Audio</span>
            {error && <span style={{ fontSize: 11, color: "#EF4444" }}>(audio belum tersedia — cek transcript)</span>}
            <span style={{ marginLeft: "auto", fontSize: 12, color: "#94a3b8", fontVariantNumeric: "tabular-nums" }}>
              {fmt(progress)} / {fmt(duration)}
            </span>
          </div>
          <div style={{ height: 6, background: "rgba(15,23,42,0.5)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, #10B981, #3B82F6)", transition: "width 0.2s" }} />
          </div>
        </div>
        <button onClick={() => setShowTranscript(!showTranscript)}
          style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid rgba(148,163,184,0.2)", background: "rgba(15,23,42,0.4)", color: "#94a3b8", cursor: "pointer", fontSize: 12 }}>
          {showTranscript ? "Hide" : "Show"} transcript
        </button>
      </div>
      {showTranscript && (
        <div style={{ marginTop: 14, padding: 14, background: "rgba(15,23,42,0.5)", borderRadius: 10, fontSize: 13, lineHeight: 1.7, color: "#cbd5e1", whiteSpace: "pre-wrap", maxHeight: 240, overflowY: "auto" }}>
          {showTranscript === true ? "" : null}
          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Transcript (latihan saja — saat tes asli, tidak tersedia)</div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// STATS PAGE
// ============================================================

function StatsPage({ user, onBack }) {
  const history = useMemo(() => loadHistory(), []);
  const streak = useMemo(() => computeStreak(history), [history]);

  const summary = useMemo(() => {
    if (!history.length) return null;
    const totalSessions = history.length;
    const totalCorrect = history.reduce((s, h) => s + (h.correct || 0), 0);
    const totalQuestions = history.reduce((s, h) => s + (h.total || 0), 0);
    const avgScore = totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const totalMinutes = Math.round(history.reduce((s, h) => s + (h.timeSec || 0), 0) / 60);

    const byType = {};
    history.forEach(h => {
      const k = h.type || h.bookId || "unknown";
      byType[k] = byType[k] || { correct: 0, total: 0, sessions: 0, label: h.label || k };
      byType[k].correct += h.correct || 0;
      byType[k].total += h.total || 0;
      byType[k].sessions += 1;
    });
    const trend = history.slice(0, 10).reverse().map(h => ({
      score: h.total ? Math.round((h.correct / h.total) * 100) : 0,
      label: h.label,
    }));
    return { totalSessions, totalCorrect, totalQuestions, avgScore, totalMinutes, byType, trend };
  }, [history]);

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={{ ...styles.button, ...styles.secondaryButton, marginBottom: 24 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Kembali
      </button>

      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>
        <span style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Statistik Belajar</span>
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: 32 }}>Lacak progress dan konsistensi belajar IELTS-mu.</p>

      {!summary ? (
        <div style={{ ...styles.card, padding: 48, textAlign: "center" }}>
          <Icon name="stats" size={48} color="#475569" />
          <p style={{ color: "#94a3b8", marginTop: 16 }}>Belum ada riwayat. Selesaikan satu sesi untuk lihat statistik!</p>
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 32 }}>
            <StatCard label="Streak" value={streak} suffix="hari" icon="flame" color="#EF4444" />
            <StatCard label="Total Sesi" value={summary.totalSessions} icon="trophy" color="#F59E0B" />
            <StatCard label="Rata-rata Skor" value={`${summary.avgScore}%`} icon="stats" color={summary.avgScore >= 70 ? "#10B981" : "#3B82F6"} />
            <StatCard label="Soal Dijawab" value={summary.totalQuestions} icon="book" color="#8B5CF6" />
            <StatCard label="Total Waktu" value={summary.totalMinutes} suffix="menit" icon="key" color="#06B6D4" />
          </div>

          {/* Trend chart */}
          {summary.trend.length > 0 && (
            <div style={{ ...styles.card, padding: 24, marginBottom: 32 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Tren 10 Sesi Terakhir</h3>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 160 }}>
                {summary.trend.map((t, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>{t.score}%</div>
                    <div style={{ width: "100%", height: `${t.score}%`, minHeight: 4, background: t.score >= 70 ? "linear-gradient(180deg, #10B981, #059669)" : t.score >= 50 ? "linear-gradient(180deg, #F59E0B, #D97706)" : "linear-gradient(180deg, #EF4444, #DC2626)", borderRadius: "4px 4px 0 0" }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Per-type breakdown */}
          <div style={{ ...styles.card, padding: 24, marginBottom: 32 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Performa per Kategori</h3>
            {Object.entries(summary.byType).map(([k, v]) => {
              const pct = v.total ? Math.round((v.correct / v.total) * 100) : 0;
              return (
                <div key={k} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                    <span style={{ color: "#cbd5e1", fontWeight: 600 }}>{v.label}</span>
                    <span style={{ color: pct >= 70 ? "#10B981" : pct >= 50 ? "#F59E0B" : "#EF4444", fontWeight: 700 }}>{v.correct}/{v.total} ({pct}%)</span>
                  </div>
                  <div style={{ height: 8, background: "rgba(15,23,42,0.5)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: pct >= 70 ? "#10B981" : pct >= 50 ? "#F59E0B" : "#EF4444" }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* History list */}
          <div style={{ ...styles.card, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Riwayat Sesi</h3>
              <button onClick={() => { if (confirm("Hapus semua riwayat?")) { clearHistory(); window.location.reload(); } }}
                style={{ fontSize: 12, color: "#64748b", background: "transparent", border: "none", cursor: "pointer" }}>
                Reset history
              </button>
            </div>
            <div style={{ maxHeight: 400, overflowY: "auto" }}>
              {history.slice(0, 20).map((h, i) => {
                const pct = h.total ? Math.round((h.correct / h.total) * 100) : 0;
                return (
                  <div key={i} style={{ padding: "12px 0", borderBottom: "1px solid rgba(148,163,184,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{h.label}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{new Date(h.completedAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: pct >= 70 ? "#10B981" : pct >= 50 ? "#F59E0B" : "#EF4444" }}>{h.correct}/{h.total}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{pct}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value, suffix, icon, color }) {
  return (
    <div style={{ ...styles.card, padding: 18, display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
        <Icon name={icon} size={20} />
      </div>
      <div>
        <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#e2e8f0" }}>{value}{suffix && <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500, marginLeft: 4 }}>{suffix}</span>}</div>
      </div>
    </div>
  );
}

// ============================================================
// HOME PAGE
// ============================================================

function HomePage({ user, onSelectTest, onSelectType, onRequireLogin, onOpenStats }) {
  const [section, setSection] = useState("reading"); // reading | listening
  const readingTypes = Object.values(QUESTION_TYPES);
  const listeningTypes = Object.values(LISTENING_TYPES);
  const streak = useMemo(() => computeStreak(loadHistory()), [user]);

  const stats = useMemo(() => {
    let totalQuestions = 0, totalPassages = 0, totalTests = 0, totalListening = 0;
    SAMPLE_DATA.forEach(b => b.tests.forEach(t => {
      totalTests++;
      t.reading?.passages.forEach(p => { totalPassages++; p.questionGroups.forEach(g => totalQuestions += g.questions.length); });
      t.listening?.sections.forEach(s => s.questionGroups.forEach(g => totalListening += g.questions.length));
    }));
    return { totalQuestions, totalPassages, totalTests, totalListening, totalBooks: SAMPLE_DATA.length };
  }, []);

  return (
    <div style={styles.container}>
      <div style={{ textAlign: "center", marginBottom: 48, paddingTop: 32 }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>
          <span style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>IELTS Practice Hub</span>
        </h1>
        <p style={{ fontSize: 18, color: "#94a3b8", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
          Latihan Reading dari Cambridge IELTS 1-20 dengan 14 tipe soal. Pilih full test atau fokus pada tipe soal tertentu.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
          {[{ label: "Books", value: stats.totalBooks }, { label: "Tests", value: stats.totalTests }, { label: "Reading Q", value: stats.totalQuestions }, { label: "Listening Q", value: stats.totalListening }, { label: "Question Types", value: 14 + 7 }].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#3B82F6" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {user && streak > 0 && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", marginTop: 24, borderRadius: 24, background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(245,158,11,0.15))", border: "1px solid rgba(239,68,68,0.3)", color: "#F59E0B", fontSize: 13, fontWeight: 700 }}>
            <Icon name="flame" size={16} color="#EF4444" />
            {streak} hari streak — terus pertahankan!
          </div>
        )}
      </div>

      {/* Section Tabs: Reading / Listening / Stats */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24, padding: 6, background: "rgba(15,23,42,0.6)", borderRadius: 14, border: "1px solid rgba(148,163,184,0.1)", maxWidth: 480, margin: "0 auto 32px" }}>
        {[
          { id: "reading", label: "Reading", icon: "book", color: "#3B82F6" },
          { id: "listening", label: "Listening", icon: "headphones", color: "#10B981" },
          { id: "stats", label: "Stats", icon: "stats", color: "#8B5CF6" },
        ].map(t => (
          <button key={t.id} onClick={() => t.id === "stats" ? onOpenStats() : setSection(t.id)}
            style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "none",
              background: section === t.id ? `${t.color}20` : "transparent",
              color: section === t.id ? t.color : "#94a3b8",
              cursor: "pointer", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.15s" }}>
            <Icon name={t.icon} size={14} /> {t.label}
          </button>
        ))}
      </div>

      {/* How keys work card */}
      {user && (
        <div style={{ ...styles.card, padding: "20px 24px", marginBottom: 32, background: "linear-gradient(135deg, rgba(245,158,11,0.05), rgba(239,68,68,0.05))", border: "1px solid rgba(245,158,11,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(245,158,11,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F59E0B" }}>
              <Icon name="key" size={24} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
                {user.unlimited ? <span style={{ color: "#10B981" }}>Unlimited Access Aktif ✓</span> : <>Kamu punya <strong style={{ color: "#F59E0B" }}>{user.keys} kunci</strong> hari ini</>}
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>1 kunci untuk subtest, 2 kunci untuk full test • Reset tiap hari</div>
            </div>
          </div>
        </div>
      )}

      {/* Practice by Question Type */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 4, height: 28, borderRadius: 2, background: section === "listening" ? "linear-gradient(180deg, #10B981, #059669)" : "linear-gradient(180deg, #3B82F6, #8B5CF6)" }} />
          Latihan per Tipe Soal {section === "listening" ? "(Listening)" : "(Reading)"}
        </h2>
        <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20, marginLeft: 14 }}>{section === "listening" ? "7 tipe soal Listening" : "14 tipe soal Reading"} • 1 kunci per sesi</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
          {(section === "listening" ? listeningTypes : readingTypes).map(type => {
            const count = SAMPLE_DATA.reduce((acc, b) => {
              b.tests.forEach(t => {
                if (section === "listening") {
                  t.listening?.sections.forEach(s => s.questionGroups.forEach(g => { if (g.type === type.id) acc += g.questions.length; }));
                } else {
                  t.reading?.passages.forEach(p => p.questionGroups.forEach(g => { if (g.type === type.id) acc += g.questions.length; }));
                }
              });
              return acc;
            }, 0);
            const available = count > 0;

            return (
              <button key={type.id} disabled={!available}
                onClick={() => { if (!user) onRequireLogin(); else onSelectType(type.id); }}
                style={{ ...styles.card, padding: "16px 18px", cursor: available ? "pointer" : "not-allowed", opacity: available ? 1 : 0.4, textAlign: "left", border: "1px solid rgba(148, 163, 184, 0.1)", transition: "all 0.2s ease", background: "rgba(30, 41, 59, 0.6)" }}
                onMouseEnter={e => { if (available) { e.currentTarget.style.borderColor = type.color; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 6px 20px ${type.color}25`; } }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.1)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: `${type.color}15`, display: "flex", alignItems: "center", justifyContent: "center", color: type.color, flexShrink: 0 }}>
                    <Icon name={type.icon} size={22} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#e2e8f0", lineHeight: 1.3 }}>{type.short}</div>
                    <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{count} soal • <span style={{ color: "#F59E0B" }}>1 🔑</span></div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.4, paddingLeft: 56, marginTop: -36, marginBottom: 0 }}></div>
                <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.4 }}>{type.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Full Tests */}
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 4, height: 28, borderRadius: 2, background: "linear-gradient(180deg, #EF4444, #F59E0B)" }} />
          Full Test {section === "listening" ? "(Listening)" : "(Reading)"}
        </h2>
        <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20, marginLeft: 14 }}>
          {section === "listening" ? "Simulasi listening 30 menit, 4 sections, 40 soal" : "Simulasi reading 60 menit, 3 passages, 40 soal"} • 2 kunci per sesi
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {SAMPLE_DATA.map(book => book.tests.map(test => {
            const sec = section === "listening" ? test.listening : test.reading;
            if (!sec) return null;
            const items = section === "listening" ? sec.sections : sec.passages;
            const itemLabel = section === "listening" ? "sections" : "passages";
            const totalQ = items.reduce((a, x) => a + x.questionGroups.reduce((b, g) => b + g.questions.length, 0), 0);
            const allTypeIds = [...new Set(items.flatMap(x => x.questionGroups.map(g => g.type)))];
            const accent = section === "listening" ? "#10B981" : "#3B82F6";
            return (
              <div key={test.id} style={{ ...styles.card, cursor: "pointer", transition: "all 0.2s ease" }}
                onClick={() => { if (!user) onRequireLogin(); else onSelectTest(book.id, test.id, section); }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 30px ${accent}25`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.1)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                        <Icon name={section === "listening" ? "headphones" : "book"} size={11} color={accent} /> Cambridge IELTS — {section}
                      </div>
                      <h3 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Book {book.book} — Test {test.testNumber}</h3>
                    </div>
                    <Badge color={book.type === "Academic" ? "#3B82F6" : "#10B981"}>{book.type}</Badge>
                  </div>

                  <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
                    <div style={{ fontSize: 13, color: "#64748b" }}><span style={{ color: "#94a3b8", fontWeight: 600 }}>{items.length}</span> {itemLabel}</div>
                    <div style={{ fontSize: 13, color: "#64748b" }}><span style={{ color: "#94a3b8", fontWeight: 600 }}>{totalQ}</span> questions</div>
                    <div style={{ fontSize: 13, color: "#64748b" }}><span style={{ color: "#94a3b8", fontWeight: 600 }}>{section === "listening" ? 30 : 60}</span> min</div>
                  </div>

                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>
                    {allTypeIds.map(typeId => {
                      const t = ALL_TYPES[typeId];
                      return t && <Badge key={typeId} color={t.color} icon={<Icon name={t.icon} size={11} />}>{t.short}</Badge>;
                    })}
                  </div>

                  <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid rgba(148,163,184,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#F59E0B", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                      <Icon name="key" size={12} /> 2 kunci
                    </span>
                    <span style={{ fontSize: 12, color: accent, fontWeight: 600 }}>Mulai →</span>
                  </div>
                </div>
              </div>
            );
          }))}
        </div>

        <div style={{ ...styles.card, padding: "40px 24px", textAlign: "center", marginTop: 16, borderStyle: "dashed", opacity: 0.5 }}>
          <p style={{ color: "#64748b", fontSize: 14 }}>Cambridge IELTS 1-19 — Data sedang diproses (OCR). Akan tersedia segera.</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TEST PAGE
// ============================================================

function TestPage({ bookId, testId, questionType, mode = "reading", onBack }) {
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const passageRef = useRef(null);
  const savedRef = useRef(false);

  const isListening = mode === "listening" || (questionType && LISTENING_TYPES[questionType]);

  const { passages, bookTitle, testNumber, audioUrl } = useMemo(() => {
    if (questionType) {
      const isL = !!LISTENING_TYPES[questionType];
      const matched = [];
      SAMPLE_DATA.forEach(book => book.tests.forEach(test => {
        const items = isL ? test.listening?.sections : test.reading?.passages;
        items?.forEach(passage => {
          const matchedGroups = passage.questionGroups.filter(g => g.type === questionType);
          if (matchedGroups.length > 0) {
            matched.push({
              ...passage,
              questionGroups: matchedGroups,
              bookInfo: `Cambridge ${book.book} Test ${test.testNumber}`,
              audioUrl: test.listening?.audioUrl,
            });
          }
        });
      }));
      return { passages: matched, bookTitle: ALL_TYPES[questionType]?.label || questionType, testNumber: null, audioUrl: matched[0]?.audioUrl };
    }
    const book = SAMPLE_DATA.find(b => b.id === bookId);
    const test = book?.tests.find(t => t.id === testId);
    if (isListening && test?.listening) {
      return { passages: test.listening.sections, bookTitle: `Cambridge IELTS ${book?.book}`, testNumber: test?.testNumber, audioUrl: test.listening.audioUrl };
    }
    return { passages: test?.reading?.passages || [], bookTitle: `Cambridge IELTS ${book?.book}`, testNumber: test?.testNumber, audioUrl: null };
  }, [bookId, testId, questionType, mode]);

  const currentPassage = passages[currentPassageIndex];
  const handleAnswer = useCallback((qn, val) => setUserAnswers(prev => ({ ...prev, [qn]: val })), []);

  const handleSubmit = () => { setShowResults(true); setTimerRunning(false); };

  const totalQuestions = passages.reduce((a, p) => a + p.questionGroups.reduce((b, g) => b + g.questions.length, 0), 0);
  const answeredCount = Object.keys(userAnswers).length;

  const score = useMemo(() => {
    if (!showResults) return null;
    let correct = 0, total = 0;
    passages.forEach(p => p.questionGroups.forEach(g => g.questions.forEach(q => {
      total++;
      if ((userAnswers[q.number] || "").trim().toLowerCase() === q.answer.trim().toLowerCase()) correct++;
    })));
    return { correct, total, percentage: Math.round((correct / total) * 100) };
  }, [showResults, passages, userAnswers]);

  // Save to history once when results shown
  useEffect(() => {
    if (showResults && score && !savedRef.current) {
      savedRef.current = true;
      saveHistoryEntry({
        type: questionType || (isListening ? "FULL_LISTENING" : "FULL_READING"),
        bookId, testId,
        label: questionType ? (ALL_TYPES[questionType]?.label || questionType) : `${bookTitle} — Test ${testNumber} (${isListening ? "Listening" : "Reading"})`,
        correct: score.correct, total: score.total,
        timeSec: elapsedTime,
      });
    }
  }, [showResults, score]);

  if (!currentPassage) return (
    <div style={styles.container}><p>No questions available.</p>
      <button onClick={onBack} style={{ ...styles.button, ...styles.primaryButton }}>Back</button></div>
  );

  return (
    <div>
      <div style={{ background: "rgba(15, 23, 42, 0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(148, 163, 184, 0.1)", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={onBack} style={{ ...styles.button, ...styles.secondaryButton, padding: "8px 14px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Kembali
          </button>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{bookTitle}</div>
            {testNumber && <div style={{ fontSize: 12, color: "#64748b" }}>Test {testNumber} — Reading</div>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Timer isRunning={timerRunning} onTimeUpdate={setElapsedTime} />
          <div style={{ fontSize: 13, color: "#94a3b8" }}>
            <span style={{ color: answeredCount === totalQuestions ? "#10B981" : "#F59E0B", fontWeight: 700 }}>{answeredCount}</span>/{totalQuestions} dijawab
          </div>
          {!showResults ? (
            <button onClick={handleSubmit} style={{ ...styles.button, ...styles.primaryButton }}>Submit</button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: score.percentage >= 70 ? "#10B981" : score.percentage >= 50 ? "#F59E0B" : "#EF4444" }}>
                {score.correct}/{score.total}
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>({score.percentage}%)</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ background: "rgba(15, 23, 42, 0.5)", borderBottom: "1px solid rgba(148, 163, 184, 0.08)", padding: "0 24px", display: "flex", gap: 4, overflowX: "auto" }}>
        {passages.map((p, idx) => (
          <button key={p.id} onClick={() => { setCurrentPassageIndex(idx); passageRef.current?.scrollTo(0, 0); }}
            style={{ padding: "12px 20px", background: idx === currentPassageIndex ? "rgba(59, 130, 246, 0.1)" : "transparent", border: "none", borderBottom: idx === currentPassageIndex ? "2px solid #3B82F6" : "2px solid transparent", color: idx === currentPassageIndex ? "#3B82F6" : "#64748b", cursor: "pointer", fontWeight: 600, fontSize: 13, whiteSpace: "nowrap" }}>
            {questionType ? (p.bookInfo || `Item ${idx + 1}`) : (isListening ? `Section ${p.sectionNumber || idx + 1}` : `Passage ${p.passageNumber}`)}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isListening ? "1fr" : "1fr 1fr", height: "calc(100vh - 170px)" }}>
        {!isListening && (
          <div ref={passageRef} style={{ overflowY: "auto", padding: "32px", borderRight: "1px solid rgba(148, 163, 184, 0.1)" }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, color: "#f1f5f9" }}>{currentPassage.title}</h2>
            {currentPassage.subtitle && <p style={{ fontSize: 14, color: "#94a3b8", fontStyle: "italic", marginBottom: 24, lineHeight: 1.5 }}>{currentPassage.subtitle}</p>}
            <div style={{ fontSize: 15, lineHeight: 1.8, color: "#cbd5e1" }}>
              {currentPassage.text?.split("\n\n").map((para, i) => <p key={i} style={{ marginBottom: 16 }}>{para}</p>)}
            </div>
          </div>
        )}

        <div style={{ overflowY: "auto", padding: "32px", maxWidth: isListening ? 900 : "100%", margin: isListening ? "0 auto" : 0, width: "100%" }}>
          {isListening && (
            <>
              <div style={{ marginBottom: 16 }}>
                <Badge color="#10B981" icon={<Icon name="headphones" size={11} />}>Section {currentPassage.sectionNumber || currentPassageIndex + 1}</Badge>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 10, marginBottom: 6, color: "#f1f5f9" }}>{currentPassage.context || "Listening Section"}</h2>
              </div>
              <AudioPlayer src={currentPassage.audioUrl || audioUrl} autoPlay={false} />
              {currentPassage.transcript && (
                <details style={{ marginBottom: 20, background: "rgba(15,23,42,0.4)", borderRadius: 10, padding: 12, border: "1px solid rgba(148,163,184,0.1)" }}>
                  <summary style={{ cursor: "pointer", fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>Lihat transcript (mode latihan)</summary>
                  <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.7, color: "#cbd5e1", whiteSpace: "pre-wrap", maxHeight: 220, overflowY: "auto" }}>
                    {currentPassage.transcript}
                  </div>
                </details>
              )}
            </>
          )}
          {currentPassage.questionGroups.map((group, gi) => {
            const t = ALL_TYPES[group.type];
            return (
              <div key={gi} style={{ marginBottom: 32 }}>
                <div style={{ marginBottom: 20, display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${t?.color}15`, display: "flex", alignItems: "center", justifyContent: "center", color: t?.color, flexShrink: 0 }}>
                    <Icon name={t?.icon} size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Badge color={t?.color}>{t?.label}</Badge>
                    <p style={{ fontSize: 14, color: "#94a3b8", marginTop: 8, lineHeight: 1.5 }}>{group.instruction}</p>
                    {group.subInstruction && <p style={{ fontSize: 13, color: "#64748b", marginTop: 4, fontStyle: "italic" }}>{group.subInstruction}</p>}
                  </div>
                </div>

                {group.questions.map(q => (
                  <QuestionItem key={q.number} question={q} group={group}
                    userAnswer={userAnswers[q.number] || ""} onAnswer={val => handleAnswer(q.number, val)} showResults={showResults} />
                ))}

                {group.type === "MATCHING_ENDINGS" && group.endings && (
                  <div style={{ background: "rgba(15, 23, 42, 0.5)", borderRadius: 10, padding: 16, marginTop: -16, marginBottom: 16, border: "1px solid rgba(148, 163, 184, 0.1)" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Options</div>
                    {group.endings.map(e => (
                      <div key={e.label} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: "#94a3b8" }}>
                        <span style={{ fontWeight: 700, color: "#3B82F6", minWidth: 20 }}>{e.label}.</span><span>{e.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {(group.type === "MATCHING_FEATURES" || group.type === "L_MATCHING") && group.options && (
                  <div style={{ background: "rgba(15, 23, 42, 0.5)", borderRadius: 10, padding: 16, marginTop: -16, marginBottom: 16, border: "1px solid rgba(148, 163, 184, 0.1)" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>List</div>
                    {group.options.map(o => (
                      <div key={o.label} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: "#94a3b8" }}>
                        <span style={{ fontWeight: 700, color: "#3B82F6", minWidth: 20 }}>{o.label}.</span><span>{o.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {showResults && (
            <div style={{ background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))", borderRadius: 16, padding: 24, border: "1px solid rgba(59, 130, 246, 0.2)", textAlign: "center", marginTop: 16 }}>
              <div style={{ fontSize: 14, color: "#94a3b8", marginBottom: 8 }}>Score untuk passage ini</div>
              <div style={{ fontSize: 36, fontWeight: 800 }}>
                <span style={{ color: score.percentage >= 70 ? "#10B981" : score.percentage >= 50 ? "#F59E0B" : "#EF4444" }}>{score.correct}</span>
                <span style={{ color: "#475569" }}> / {score.total}</span>
              </div>
              <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>Waktu: {Math.floor(elapsedTime / 60)}m {elapsedTime % 60}s</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Timer({ isRunning, onTimeUpdate }) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => setSeconds(s => { const v = s + 1; onTimeUpdate?.(v); return v; }), 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);
  const m = Math.floor(seconds / 60), s = seconds % 60;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 14 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      <span style={{ fontVariantNumeric: "tabular-nums" }}>{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}</span>
    </div>
  );
}

// ============================================================
// QUESTION ITEM
// ============================================================

function QuestionItem({ question, group, userAnswer, onAnswer, showResults }) {
  const isCorrect = showResults && userAnswer.trim().toLowerCase() === question.answer.trim().toLowerCase();
  const isWrong = showResults && userAnswer && !isCorrect;
  const isUnanswered = showResults && !userAnswer;
  const borderColor = showResults ? (isCorrect ? "#10B981" : (isWrong || isUnanswered) ? "#EF4444" : "rgba(148,163,184,0.1)") : "rgba(148,163,184,0.1)";

  if (group.type === "TFNG" || group.type === "YNNG") {
    const options = group.type === "TFNG" ? ["TRUE", "FALSE", "NOT GIVEN"] : ["YES", "NO", "NOT GIVEN"];
    return (
      <div style={{ marginBottom: 16, padding: 16, borderRadius: 12, background: "rgba(15,23,42,0.4)", border: `1px solid ${borderColor}` }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <span style={{ fontWeight: 800, color: "#3B82F6", minWidth: 28 }}>{question.number}.</span>
          <span style={{ fontSize: 14, color: "#e2e8f0", lineHeight: 1.5 }}>{question.text}</span>
        </div>
        <div style={{ display: "flex", gap: 8, marginLeft: 36, flexWrap: "wrap" }}>
          {options.map(opt => (
            <button key={opt} onClick={() => !showResults && onAnswer(opt)}
              style={{ padding: "6px 14px", borderRadius: 8, border: userAnswer === opt ? "2px solid #3B82F6" : "1px solid rgba(148,163,184,0.2)",
                background: userAnswer === opt ? "rgba(59,130,246,0.15)" : "rgba(148,163,184,0.05)",
                color: userAnswer === opt ? "#3B82F6" : "#94a3b8", cursor: showResults ? "default" : "pointer", fontSize: 12, fontWeight: 600 }}>
              {opt}
            </button>
          ))}
        </div>
        {showResults && <div style={{ marginLeft: 36, marginTop: 8, fontSize: 13, color: isCorrect ? "#10B981" : "#EF4444", fontWeight: 600 }}>{isCorrect ? "Benar!" : `Jawaban: ${question.answer}`}</div>}
      </div>
    );
  }

  if ((group.type === "MC" || group.type === "L_MC" || group.type === "CHOOSE_TITLE" || group.type === "LIST_OPTIONS") && question.options) {
    return (
      <div style={{ marginBottom: 16, padding: 16, borderRadius: 12, background: "rgba(15,23,42,0.4)", border: `1px solid ${borderColor}` }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <span style={{ fontWeight: 800, color: "#3B82F6", minWidth: 28 }}>{question.number}.</span>
          <span style={{ fontSize: 14, color: "#e2e8f0", lineHeight: 1.5 }}>{question.text}</span>
        </div>
        <div style={{ marginLeft: 36, display: "flex", flexDirection: "column", gap: 8 }}>
          {question.options.map(opt => {
            const selected = userAnswer === opt.label;
            const isCorrectOpt = showResults && opt.label === question.answer;
            return (
              <button key={opt.label} onClick={() => !showResults && onAnswer(opt.label)}
                style={{ padding: "10px 14px", borderRadius: 10,
                  border: selected ? "2px solid #3B82F6" : isCorrectOpt ? "2px solid #10B981" : "1px solid rgba(148,163,184,0.15)",
                  background: selected ? "rgba(59,130,246,0.1)" : isCorrectOpt ? "rgba(16,185,129,0.1)" : "transparent",
                  color: "#cbd5e1", cursor: showResults ? "default" : "pointer", textAlign: "left", fontSize: 13,
                  display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontWeight: 700, color: selected ? "#3B82F6" : isCorrectOpt ? "#10B981" : "#64748b", minWidth: 18 }}>{opt.label}.</span>
                <span>{opt.text}</span>
              </button>
            );
          })}
        </div>
        {showResults && <div style={{ marginLeft: 36, marginTop: 8, fontSize: 13, color: isCorrect ? "#10B981" : "#EF4444", fontWeight: 600 }}>{isCorrect ? "Benar!" : `Jawaban: ${question.answer}`}</div>}
      </div>
    );
  }

  if (["MATCHING_INFO", "MATCHING_FEATURES", "MATCHING_ENDINGS", "MATCHING_HEADINGS", "L_MATCHING"].includes(group.type)) {
    return (
      <div style={{ marginBottom: 12, padding: 14, borderRadius: 12, background: "rgba(15,23,42,0.4)", border: `1px solid ${borderColor}`, display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontWeight: 800, color: "#3B82F6", minWidth: 28 }}>{question.number}.</span>
        <span style={{ fontSize: 14, color: "#e2e8f0", lineHeight: 1.4, flex: 1 }}>{question.text}</span>
        <input type="text" value={userAnswer} onChange={e => !showResults && onAnswer(e.target.value.toUpperCase())}
          placeholder="A-G" maxLength={3} disabled={showResults}
          style={{ width: 50, padding: "6px 10px", borderRadius: 8, border: "1px solid rgba(148,163,184,0.2)",
            background: "rgba(15,23,42,0.6)", color: "#e2e8f0", textAlign: "center", fontSize: 14, fontWeight: 700, textTransform: "uppercase" }} />
        {showResults && <span style={{ fontSize: 13, fontWeight: 700, color: isCorrect ? "#10B981" : "#EF4444", minWidth: 30 }}>{isCorrect ? "✓" : question.answer}</span>}
      </div>
    );
  }

  // Default text input (completion types, short answer, diagram)
  return (
    <div style={{ marginBottom: 12, padding: 14, borderRadius: 12, background: "rgba(15,23,42,0.4)", border: `1px solid ${borderColor}` }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ fontWeight: 800, color: "#3B82F6", minWidth: 28 }}>{question.number}.</span>
        <span style={{ fontSize: 14, color: "#e2e8f0", lineHeight: 1.4, flex: 1 }}>
          {question.text.includes("___") ? question.text.split("___").map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>{part}
                <input type="text" value={userAnswer} onChange={e => !showResults && onAnswer(e.target.value)} disabled={showResults}
                  style={{ width: 120, padding: "4px 8px", borderRadius: 6, border: "1px solid rgba(148,163,184,0.3)",
                    background: "rgba(15,23,42,0.6)", color: "#e2e8f0", fontSize: 14, margin: "0 4px" }} />
              </span>
            ) : <span key={i}>{part}</span>
          ) : (
            <>{question.text}
              <input type="text" value={userAnswer} onChange={e => !showResults && onAnswer(e.target.value)} disabled={showResults}
                placeholder="Jawaban..."
                style={{ width: 140, padding: "4px 8px", borderRadius: 6, border: "1px solid rgba(148,163,184,0.3)",
                  background: "rgba(15,23,42,0.6)", color: "#e2e8f0", fontSize: 14, marginLeft: 8 }} />
            </>
          )}
        </span>
      </div>
      {showResults && <div style={{ marginLeft: 36, marginTop: 6, fontSize: 13, color: isCorrect ? "#10B981" : "#EF4444", fontWeight: 600 }}>{isCorrect ? "Benar!" : `Jawaban: ${question.answer}`}</div>}
    </div>
  );
}

// ============================================================
// INSUFFICIENT KEYS MODAL
// ============================================================

function NoKeysModal({ needed, current, onClose, onDonate }) {
  return (
    <div style={styles.modal} onClick={onClose}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(245,158,11,0.15)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16, color: "#F59E0B" }}>
            <Icon name="lock" size={32} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Kunci Tidak Cukup</h2>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>
            Sesi ini butuh <strong style={{ color: "#F59E0B" }}>{needed} kunci</strong>.<br/>
            Kamu hanya punya <strong>{current}</strong>. Kunci akan reset besok pagi.
          </p>
        </div>

        <button onClick={onDonate}
          style={{ width: "100%", padding: "14px 20px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #F59E0B, #EF4444)", color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          🔓 Unlock Unlimited (Donasi)
        </button>

        <button onClick={onClose}
          style={{ width: "100%", padding: "10px", marginTop: 8, background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontSize: 13 }}>
          Tunggu reset besok
        </button>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("home");
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedMode, setSelectedMode] = useState("reading");
  const [showLogin, setShowLogin] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [showNoKeys, setShowNoKeys] = useState(null);

  useEffect(() => { setUser(loadUser()); }, []);

  const consumeKeys = (count) => {
    if (!user) return false;
    if (user.unlimited) return true;
    if (user.keys < count) {
      setShowNoKeys({ needed: count, current: user.keys });
      return false;
    }
    const updated = { ...user, keys: user.keys - count };
    saveUser(updated);
    setUser(updated);
    return true;
  };

  const handleSelectTest = (bookId, testId, mode = "reading") => {
    if (!consumeKeys(2)) return;
    setSelectedBook(bookId); setSelectedTest(testId); setSelectedType(null); setSelectedMode(mode); setView("test");
  };

  const handleSelectType = (typeId) => {
    if (!consumeKeys(1)) return;
    setSelectedType(typeId); setSelectedBook(null); setSelectedTest(null);
    setSelectedMode(LISTENING_TYPES[typeId] ? "listening" : "reading");
    setView("test");
  };

  const handleBack = () => { setView("home"); setSelectedBook(null); setSelectedTest(null); setSelectedType(null); };

  const handleLogin = (u) => { setUser(u); setShowLogin(false); };
  const handleLogout = () => { clearUser(); setUser(null); handleBack(); };

  return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={handleBack}>
          <div style={styles.logoIcon}>IE</div>
          <span style={styles.logoText}>IELTS Practice Hub</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {user ? (
            <>
              <KeyDisplay user={user} onClick={() => !user.unlimited && setShowDonate(true)} />
              <UserMenu user={user} onLogout={handleLogout} onDonate={() => setShowDonate(true)} />
            </>
          ) : (
            <button onClick={() => setShowLogin(true)} style={{ ...styles.button, ...styles.primaryButton }}>
              <Icon name="google" size={16} /> Login
            </button>
          )}
        </div>
      </nav>

      {view === "home" && (
        <HomePage user={user} onSelectTest={handleSelectTest} onSelectType={handleSelectType}
          onRequireLogin={() => setShowLogin(true)} onOpenStats={() => user ? setView("stats") : setShowLogin(true)} />
      )}
      {view === "stats" && <StatsPage user={user} onBack={handleBack} />}
      {view === "test" && <TestPage bookId={selectedBook} testId={selectedTest} questionType={selectedType} mode={selectedMode} onBack={handleBack} />}

      {showLogin && <LoginModal onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
      {showDonate && user && <DonateModal user={user} onClose={() => setShowDonate(false)} onUnlock={(u) => { setUser(u); setShowDonate(false); }} />}
      {showNoKeys && <NoKeysModal {...showNoKeys} onClose={() => setShowNoKeys(null)} onDonate={() => { setShowNoKeys(null); setShowDonate(true); }} />}
    </div>
  );
}

export type AnatomyHotspot = {
  id: string;
  label: string;
  detail: string;
  position: [number, number, number];
  color: string;
};

export type LandmarkProfile = {
  what: string;
  location: string;
  function: string;
  relations: string;
  clinicalNote: string;
};

export type AnatomyStory = {
  title: string;
  intro: string;
  steps: Array<{ hotspotId: string; title: string; detail: string }>;
};

export type AnatomyRelationship = {
  fromId: string;
  toId: string;
  kind: "Adjacency" | "Attachment" | "Blood flow" | "Drainage" | "Functional link" | "Pathway" | "Surgical relation";
  summary: string;
  sourceId?: string;
};

export type RelationshipReference = { label: string; href: string };

export const relationshipReferences: Record<string, RelationshipReference> = {
  heart: { label: "StatPearls: Anatomy, Thorax, Heart", href: "https://www.ncbi.nlm.nih.gov/books/NBK470256/" },
  brain: { label: "StatPearls: Neuroanatomy, Cerebral Hemisphere", href: "https://www.ncbi.nlm.nih.gov/books/NBK549789/" },
  lungs: { label: "StatPearls: Anatomy, Airway", href: "https://www.ncbi.nlm.nih.gov/books/NBK459258/" },
  liver: { label: "StatPearls: Portal Venous System", href: "https://www.ncbi.nlm.nih.gov/books/NBK554589/" },
  kidneys: { label: "StatPearls: Anatomy, Kidneys", href: "https://www.ncbi.nlm.nih.gov/books/NBK482385/" },
  eyeball: { label: "StatPearls: Anatomy, Eye", href: "https://www.ncbi.nlm.nih.gov/books/NBK482428/" },
  intestine: { label: "StatPearls: Physiology, Small Bowel", href: "https://www.ncbi.nlm.nih.gov/books/NBK532263/" },
  pancreas: { label: "StatPearls: Anatomy, Pancreas", href: "https://www.ncbi.nlm.nih.gov/books/NBK532912/" },
  skin: { label: "StatPearls: Anatomy, Skin", href: "https://www.ncbi.nlm.nih.gov/books/NBK441980/" },
};

export type AnatomyOrgan = {
  id: "heart" | "brain" | "lungs" | "liver" | "kidneys" | "eyeball" | "intestine" | "pancreas" | "skin";
  name: string;
  system: string;
  systems?: string[];
  region: string;
  model: string;
  accent: string;
  description: string;
  subtitle: string;
  facts: Array<[string, string]>;
  contentSource: { label: string; href: string };
  stories: AnatomyStory[];
  relationships: AnatomyRelationship[];
  hotspots: AnatomyHotspot[];
};

export const organs: AnatomyOrgan[] = [
  {
    id: "heart", name: "Heart", system: "Cardiovascular", region: "Thorax", model: "/models/heart.glb", accent: "#ee7c6a",
    subtitle: "The tireless pump",
    description: "A muscular pump that sends deoxygenated blood to the lungs and oxygenated blood to the rest of the body.",
    facts: [["Location", "Middle mediastinum, behind the sternum"], ["Chambers", "Two atria and two ventricles"], ["At rest", "Cardiac output is about 5 L per minute"], ["Blood supply", "Right and left coronary arteries"], ["Function", "Pulmonary and systemic circulation"]],
    contentSource: { label: "StatPearls: Anatomy, Thorax, Heart", href: "https://www.ncbi.nlm.nih.gov/books/NBK470256/" },
    stories: [{ title: "Follow blood through the heart", intro: "Trace one circuit: venous blood reaches the right heart, goes to the lungs, and returns oxygenated to the left heart before entering the aorta.", steps: [{ hotspotId: "right-atrium", title: "1. Venous return", detail: "Deoxygenated blood from the body enters the right atrium through the venae cavae." }, { hotspotId: "right-ventricle", title: "2. Pulmonary pump", detail: "It passes to the right ventricle, then leaves through the pulmonary valve and pulmonary trunk for the lungs." }, { hotspotId: "left-atrium", title: "3. Return from the lungs", detail: "Oxygenated blood returns from the lungs through pulmonary veins to the left atrium." }, { hotspotId: "mitral", title: "4. Fill the left ventricle", detail: "Blood crosses the mitral valve into the left ventricle." }, { hotspotId: "left-ventricle", title: "5. Systemic pump", detail: "The left ventricle generates the pressure needed for systemic circulation." }, { hotspotId: "aorta", title: "6. Supply the body", detail: "The aorta distributes oxygenated blood to the systemic arterial tree." }] }],
    relationships: [{ fromId: "right-atrium", toId: "right-ventricle", kind: "Blood flow", summary: "Deoxygenated blood passes from the right atrium to the right ventricle through the tricuspid valve, which is not separately labelled on this model." }, { fromId: "left-atrium", toId: "mitral", kind: "Blood flow", summary: "Blood leaves the left atrium through the mitral valve on its way to the left ventricle." }, { fromId: "mitral", toId: "left-ventricle", kind: "Surgical relation", summary: "The mitral valve sits at the inlet of the left ventricle and is tethered by chordae tendineae and papillary muscles—an important functional relationship when the valve is repaired." }, { fromId: "left-ventricle", toId: "aorta", kind: "Blood flow", summary: "The left ventricle ejects oxygenated blood through the aortic valve into the aorta." }],
    hotspots: [
      { id: "aorta", label: "Aorta", detail: "The main systemic artery leaving the left ventricle.", position: [-0.35, 1.65, 0.55], color: "#ee7c6a" },
      { id: "left-atrium", label: "Left atrium", detail: "Receives oxygenated blood from the pulmonary veins.", position: [0.82, 0.65, 0.5], color: "#f2a33b" },
      { id: "right-atrium", label: "Right atrium", detail: "Receives deoxygenated blood from the venae cavae.", position: [-0.9, 0.35, 0.55], color: "#6393d8" },
      { id: "left-ventricle", label: "Left ventricle", detail: "Generates pressure for systemic circulation.", position: [0.7, -0.75, 0.65], color: "#f2a33b" },
      { id: "right-ventricle", label: "Right ventricle", detail: "Pumps deoxygenated blood into the pulmonary trunk.", position: [-0.65, -0.68, 0.66], color: "#ee7c6a" },
      { id: "mitral", label: "Mitral valve", detail: "The left atrioventricular valve; it prevents backflow into the left atrium.", position: [0.18, -1.35, 0.48], color: "#d89bc4" },
    ],
  },
  {
    id: "brain", name: "Brain", system: "Nervous system", region: "Head", model: "/models/brain.glb", accent: "#c58696", subtitle: "The universe within",
    description: "The central organ of the nervous system, integrating sensation, movement, memory, language, emotion, and autonomic function.",
    facts: [["Location", "Within the cranial cavity"], ["Major parts", "Cerebrum, cerebellum, and brainstem"], ["Blood supply", "Internal carotid and vertebral systems"], ["Protection", "Skull, meninges, and cerebrospinal fluid"], ["Function", "Integration and control"]],
    contentSource: { label: "StatPearls: Neuroanatomy, Cerebral Hemisphere", href: "https://www.ncbi.nlm.nih.gov/books/NBK549789/" },
    stories: [{ title: "From intention to coordinated movement", intro: "Follow a simplified route from planning an action to refining balance and precision.", steps: [{ hotspotId: "frontal", title: "1. Plan and initiate", detail: "Frontal networks support planning; primary motor cortex contributes to voluntary movement." }, { hotspotId: "parietal", title: "2. Locate the body", detail: "Parietal cortex integrates sensory and spatial information to guide that action." }, { hotspotId: "temporal", title: "3. Add meaning", detail: "Temporal networks contribute auditory and memory context to what we perceive and do." }, { hotspotId: "cerebellum", title: "4. Refine the result", detail: "The cerebellum compares and adjusts movement for timing, balance, and accuracy." }] }],
    relationships: [{ fromId: "frontal", toId: "parietal", kind: "Adjacency", summary: "The frontal and parietal lobes meet at the central sulcus; primary motor cortex lies in front of it and primary somatosensory cortex behind it." }, { fromId: "frontal", toId: "cerebellum", kind: "Functional link", summary: "Cerebellar circuits help refine movement initiated by cerebral motor systems; this is a functional relationship rather than a single direct landmark-to-landmark tract." }, { fromId: "temporal", toId: "parietal", kind: "Adjacency", summary: "The temporal lobe lies below the lateral sulcus, while the parietal lobe lies superior to it." }],
    hotspots: [
      { id: "frontal", label: "Frontal lobe", detail: "Supports executive functions and contains primary motor cortex for voluntary movement on the opposite side of the body.", position: [-0.7, 0.65, 0.8], color: "#ee7c6a" },
      { id: "parietal", label: "Parietal lobe", detail: "Processes somatic sensation and helps integrate spatial and body-position information.", position: [0.15, 1.1, 0.65], color: "#f2a33b" },
      { id: "temporal", label: "Temporal lobe", detail: "Important for auditory processing and memory; language roles are more specialised in the dominant hemisphere.", position: [0.75, -0.1, 0.82], color: "#6393d8" },
      { id: "cerebellum", label: "Cerebellum", detail: "Coordinates movement, posture, balance, and motor learning; it does not initiate voluntary muscle contraction.", position: [0.72, -0.9, 0.55], color: "#d89bc4" },
    ],
  },
  {
    id: "lungs", name: "Lungs", system: "Respiratory system", region: "Thorax", model: "/models/lungs.glb", accent: "#dd8f8b", subtitle: "The breath of life",
    description: "Paired organs that exchange oxygen and carbon dioxide between inspired air and pulmonary blood.",
    facts: [["Location", "Pleural cavities on either side of the mediastinum"], ["Lobes", "Right lung: 3; left lung: 2"], ["Blood supply", "Pulmonary and bronchial circulations"], ["Air pathway", "Bronchi branch into bronchioles and alveoli"], ["Function", "Gas exchange"]],
    contentSource: { label: "StatPearls: Anatomy, Airway", href: "https://www.ncbi.nlm.nih.gov/books/NBK459258/" },
    stories: [{ title: "Trace air to the alveoli", intro: "Follow inspired air from the central airway into the branching passages of the lungs, where gas exchange occurs in alveoli not individually shown on this model.", steps: [{ hotspotId: "trachea", title: "1. Enter the thorax", detail: "Air travels down the trachea, which remains open with cartilage support." }, { hotspotId: "bronchus", title: "2. Split at the carina", detail: "The trachea divides into main bronchi that carry air into each lung." }, { hotspotId: "right-lung", title: "3. Branch through the right lung", detail: "The right bronchial tree branches into lobar, segmental, then smaller bronchioles." }, { hotspotId: "left-lung", title: "4. Reach respiratory surfaces", detail: "Distal bronchioles lead to alveolar ducts and alveoli, where gases diffuse across a thin barrier." }, { hotspotId: "base", title: "5. Move with the diaphragm", detail: "The bases move with the diaphragm, helping draw air in and out during breathing." }] }],
    relationships: [{ fromId: "trachea", toId: "bronchus", kind: "Surgical relation", summary: "The trachea divides at the carina into the right and left main bronchi; the carina is a key internal landmark during airway procedures." }, { fromId: "bronchus", toId: "right-lung", kind: "Pathway", summary: "The right main bronchus enters the right lung and branches into three lobar bronchi." }, { fromId: "bronchus", toId: "left-lung", kind: "Pathway", summary: "The left main bronchus enters the left lung and branches into two lobar bronchi." }, { fromId: "base", toId: "right-lung", kind: "Attachment", summary: "The base of the right lung rests on the diaphragm and moves with it during breathing." }],
    hotspots: [
      { id: "trachea", label: "Trachea", detail: "A cartilage-supported airway that conducts air to the carina, where it divides into the main bronchi.", position: [0, 1.6, 0.2], color: "#6393d8" },
      { id: "right-lung", label: "Right lung", detail: "Has superior, middle, and inferior lobes. Its main bronchus is wider, shorter, and more vertical than the left.", position: [-1.2, 0.1, 0.7], color: "#ee7c6a" },
      { id: "left-lung", label: "Left lung", detail: "Has superior and inferior lobes and a cardiac notch that accommodates the heart.", position: [1.2, 0.1, 0.7], color: "#f2a33b" },
      { id: "bronchus", label: "Main bronchus", detail: "Conducts air from the trachea into a lung before branching into lobar and segmental bronchi.", position: [-0.03, 0.3, 0.35], color: "#d89bc4" },
      { id: "base", label: "Base of lung", detail: "The inferior diaphragmatic surface rests on the diaphragm and moves with breathing.", position: [-1.14, -1.2, 1], color: "#7fa88a" },
    ],
  },
  {
    id: "liver", name: "Liver", system: "Digestive system", region: "Abdomen", model: "/models/liver.glb", accent: "#b86858", subtitle: "The quiet alchemist",
    description: "A large metabolic organ that processes absorbed nutrients, produces bile, stores energy, and detoxifies many substances.",
    facts: [["Location", "Right upper abdomen, beneath the diaphragm"], ["Blood supply", "Hepatic artery and portal vein"], ["Drainage", "Hepatic veins to the inferior vena cava"], ["Product", "Bile"], ["Function", "Metabolism, storage, and detoxification"]],
    contentSource: { label: "StatPearls: Physiology, Liver", href: "https://www.ncbi.nlm.nih.gov/books/NBK535438/" },
    stories: [{ title: "Journey of bile and portal blood", intro: "See how blood from the digestive tract reaches liver tissue and how bile made by liver tissue leaves for the intestine. The extrahepatic ducts are described but not individually labelled on this model.", steps: [{ hotspotId: "portal", title: "1. Arrive from the gut", detail: "The portal vein brings nutrient-rich blood from the gastrointestinal tract and spleen to the liver." }, { hotspotId: "right-lobe", title: "2. Process in hepatic tissue", detail: "Within liver tissue, nutrients are processed and bile is produced by hepatocytes." }, { hotspotId: "left-lobe", title: "3. Drain bile toward the intestine", detail: "Bile drains through intrahepatic and extrahepatic ducts, ultimately reaching the duodenum." }] }],
    relationships: [{ fromId: "portal", toId: "right-lobe", kind: "Surgical relation", summary: "The portal vein divides into right and left branches at the hepatic hilum; its branching pattern matters when planning liver resection or preserving perfusion." }, { fromId: "portal", toId: "left-lobe", kind: "Blood flow", summary: "Portal venous branches also supply the left lobe; functional liver segments are defined by internal vascular and biliary anatomy rather than surface lobes alone." }, { fromId: "right-lobe", toId: "left-lobe", kind: "Adjacency", summary: "The anatomical lobes are continuous hepatic tissue separated on the diaphragmatic surface by the falciform ligament." }],
    hotspots: [
      { id: "right-lobe", label: "Right lobe", detail: "The larger anatomical lobe of the liver, occupying much of the right upper abdomen.", position: [-0.75, 0.35, 0.75], color: "#ee7c6a" },
      { id: "left-lobe", label: "Left lobe", detail: "Extends toward the left upper abdomen across the midline relative to the larger right lobe.", position: [0.85, 0.25, 0.75], color: "#f2a33b" },
      { id: "portal", label: "Portal vein", detail: "Carries nutrient-rich venous blood from the gastrointestinal tract and spleen to the liver.", position: [0.1, -0.3, 0.82], color: "#6393d8" },
    ],
  },
  {
    id: "kidneys", name: "Kidneys", system: "Urinary system", region: "Abdomen", model: "/models/kidneys.glb", accent: "#aa826f", subtitle: "The body's filters",
    description: "A pair of retroperitoneal organs that regulate fluid, electrolytes, acid-base balance, blood pressure, and urine production.",
    facts: [["Location", "Posterior abdominal wall; right is usually lower"], ["Blood supply", "Renal arteries"], ["Functional unit", "Nephron"], ["Filtrate", "About 180 L/day is formed, mostly reabsorbed"], ["Function", "Filtration and homeostasis"]],
    contentSource: { label: "StatPearls: Anatomy, Kidneys", href: "https://www.ncbi.nlm.nih.gov/books/NBK482385/" },
    stories: [{ title: "How urine is formed", intro: "Trace a simplified path from filtration in the kidney to urine leaving through the ureter. Individual nephrons and calyces are below the model's landmark scale.", steps: [{ hotspotId: "cortex", title: "1. Filter in the cortex", detail: "Renal corpuscles in the cortex filter plasma into the nephron." }, { hotspotId: "medulla", title: "2. Concentrate in the medulla", detail: "Loops and collecting ducts use the medullary gradient to help concentrate urine." }, { hotspotId: "ureter", title: "3. Send urine to the bladder", detail: "Processed urine drains to the renal pelvis and is propelled down the ureter to the bladder." }] }],
    relationships: [{ fromId: "cortex", toId: "medulla", kind: "Pathway", summary: "Fluid filtered in cortical renal corpuscles passes through nephron segments that extend into the medulla." }, { fromId: "medulla", toId: "ureter", kind: "Drainage", summary: "Collecting ducts drain through papillae into calyces and the renal pelvis, which continues as the ureter." }],
    hotspots: [
      { id: "cortex", label: "Renal cortex", detail: "The outer region of the kidney; it contains renal corpuscles and portions of renal tubules.", position: [-0.9, 0.55, 0.7], color: "#ee7c6a" },
      { id: "medulla", label: "Renal medulla", detail: "The inner region, arranged in pyramids, that contributes to concentrating urine.", position: [0.85, 0.2, 0.7], color: "#f2a33b" },
      { id: "ureter", label: "Ureter", detail: "A muscular tube that conveys urine from the renal pelvis to the urinary bladder.", position: [0.4, -1.1, 0.5], color: "#6393d8" },
    ],
  },
  {
    id: "eyeball", name: "Eye", system: "Visual system", region: "Head", model: "/models/eyeball.glb", accent: "#84a5be", subtitle: "A window to light",
    description: "A sensory organ that focuses light on the retina, where photoreceptors convert it into neural signals for vision.",
    facts: [["Location", "Orbit"], ["Diameter", "About 24 mm in adults"], ["Layers", "Fibrous, vascular, and neural tunics"], ["Blood supply", "Ophthalmic artery branches"], ["Function", "Vision"]],
    contentSource: { label: "StatPearls: Anatomy, Eye", href: "https://www.ncbi.nlm.nih.gov/books/NBK482428/" },
    stories: [{ title: "Follow light into vision", intro: "Trace light through the transparent front of the eye and follow the resulting neural signal toward the brain. The lens and retina are described but not separately labelled on this model.", steps: [{ hotspotId: "cornea", title: "1. Refract incoming light", detail: "Light first crosses the cornea, a major refracting surface." }, { hotspotId: "iris", title: "2. Regulate the aperture", detail: "The iris adjusts pupil size and therefore the amount of light entering." }, { hotspotId: "optic", title: "3. Send signals to the brain", detail: "After the retina converts light to neural signals, ganglion-cell axons leave through the optic nerve." }] }],
    relationships: [{ fromId: "cornea", toId: "iris", kind: "Adjacency", summary: "The iris lies immediately behind the cornea, separated by the aqueous-filled anterior chamber." }, { fromId: "iris", toId: "optic", kind: "Functional link", summary: "The iris regulates incoming light; retinal cells then convert that light to signals that leave through the optic nerve. The retina is not separately labelled on this model." }],
    hotspots: [
      { id: "cornea", label: "Cornea", detail: "The transparent, avascular front surface of the eye and a major refracting component of its optical system.", position: [-0.94, 0.05, 1.47], color: "#6393d8" },
      { id: "iris", label: "Iris", detail: "The coloured diaphragm that changes pupil diameter to regulate the amount of light entering the eye.", position: [-1.22, -0.53, 1.15], color: "#f2a33b" },
      { id: "optic", label: "Optic nerve", detail: "Carries axons of retinal ganglion cells from the eye toward the brain's visual pathways.", position: [1.61, -0.18, 0.54], color: "#d89bc4" },
    ],
  },
  {
    id: "intestine", name: "Intestine", system: "Digestive system", region: "Abdomen", model: "/models/intestine.glb", accent: "#d89c7a", subtitle: "The absorbing network",
    description: "The small and large intestines digest, absorb nutrients and water, and form and eliminate stool.",
    facts: [["Location", "Abdominal and pelvic cavities"], ["Parts", "Small intestine, caecum, colon, rectum"], ["Blood supply", "Superior and inferior mesenteric arteries"], ["Absorption", "Most nutrient absorption occurs in the small intestine"], ["Function", "Digestion, absorption, and elimination"]],
    contentSource: { label: "StatPearls: Physiology, Small Bowel", href: "https://www.ncbi.nlm.nih.gov/books/NBK532263/" },
    stories: [{ title: "From digestion to absorption", intro: "Follow a meal through the upper small intestine, the main absorptive region, and then the colon.", steps: [{ hotspotId: "duodenum", title: "1. Mix digestive secretions", detail: "The duodenum receives gastric contents plus bile and pancreatic secretions." }, { hotspotId: "jejunum", title: "2. Absorb nutrients", detail: "The jejunum is a major site for absorption of digested nutrients and water." }, { hotspotId: "colon", title: "3. Reclaim water", detail: "The colon absorbs water and electrolytes as intestinal contents are formed into stool." }] }],
    relationships: [{ fromId: "duodenum", toId: "jejunum", kind: "Pathway", summary: "The duodenojejunal flexure marks the transition from duodenum to jejunum." }, { fromId: "jejunum", toId: "colon", kind: "Pathway", summary: "Intestinal contents pass from jejunum through ileum to the caecum and colon; the ileum is not separately labelled on this model." }],
    hotspots: [
      { id: "duodenum", label: "Duodenum", detail: "The first part of the small intestine; it receives chyme, bile, and pancreatic secretions.", position: [0.6, 0.8, 0.75], color: "#f2a33b" },
      { id: "jejunum", label: "Jejunum", detail: "The middle portion of the small intestine and a major site of nutrient absorption.", position: [-0.45, 0.1, 0.82], color: "#ee7c6a" },
      { id: "colon", label: "Colon", detail: "The largest part of the large intestine; it absorbs water and electrolytes and helps form stool.", position: [0.75, -0.55, 0.72], color: "#6393d8" },
    ],
  },
  {
    id: "pancreas", name: "Pancreas", system: "Endocrine and digestive", systems: ["Endocrine system", "Digestive system"], region: "Abdomen", model: "/models/pancreas.glb", accent: "#d8a458", subtitle: "The balanced messenger",
    description: "A retroperitoneal gland that secretes digestive enzymes and hormones, including insulin and glucagon.",
    facts: [["Location", "Behind the stomach"], ["Parts", "Head, neck, body, and tail"], ["Blood supply", "Pancreatic branches of splenic and gastroduodenal arteries"], ["Exocrine role", "Digestive enzymes and bicarbonate"], ["Endocrine role", "Glucose regulation"]],
    contentSource: { label: "StatPearls: Anatomy, Pancreas", href: "https://www.ncbi.nlm.nih.gov/books/NBK532912/" },
    stories: [{ title: "Pancreatic secretions to the duodenum", intro: "Trace digestive secretions along the pancreas. The main duct joins the bile duct near the duodenum; the duodenum itself is described but not a separate landmark on this model.", steps: [{ hotspotId: "tail", title: "1. Begin across the gland", detail: "Exocrine pancreatic cells throughout the gland produce digestive enzymes and bicarbonate-rich fluid." }, { hotspotId: "body", title: "2. Collect through the body", detail: "Small ducts drain toward the main pancreatic duct as it runs through the body." }, { hotspotId: "head", title: "3. Approach the duodenum", detail: "At the head, the pancreatic duct approaches the descending duodenum." }, { hotspotId: "duct", title: "4. Deliver digestive fluid", detail: "The main pancreatic duct delivers secretions near the major duodenal papilla, commonly alongside bile." }] }],
    relationships: [{ fromId: "tail", toId: "body", kind: "Adjacency", summary: "The tail continues medially into the body of the pancreas across the upper abdomen." }, { fromId: "body", toId: "head", kind: "Adjacency", summary: "The body narrows toward the neck and broadens into the head, which sits in the C-shaped curve of the duodenum." }, { fromId: "head", toId: "duct", kind: "Drainage", summary: "The main pancreatic duct travels through the gland and approaches the duodenum at the pancreatic head." }],
    hotspots: [
      { id: "head", label: "Head", detail: "The broad right-sided part of the pancreas, held in the C-shaped curve of the duodenum.", position: [-1.32, -0.36, 0.55], color: "#ee7c6a" },
      { id: "body", label: "Body", detail: "The central portion of the pancreas, extending transversely across the upper abdomen.", position: [0.05, 0.25, 0.45], color: "#f2a33b" },
      { id: "tail", label: "Tail", detail: "The narrow left-sided end of the pancreas, extending toward the spleen.", position: [1.55, 0.3, 0.35], color: "#6393d8" },
      { id: "duct", label: "Pancreatic duct", detail: "Collects exocrine pancreatic secretions and carries them toward the duodenum.", position: [-0.61, 0.39, 0.5], color: "#d89bc4" },
    ],
  },
  {
    id: "skin", name: "Skin", system: "Integumentary system", region: "Whole body", model: "/models/skin.glb", accent: "#ca9980", subtitle: "The living boundary",
    description: "The body's largest organ, forming a protective barrier while supporting sensation, immune defence, and temperature regulation.",
    facts: [["Layers", "Epidermis, dermis, and hypodermis"], ["Area", "About 1.5 to 2 m2 in adults"], ["Blood supply", "Dermal vascular plexuses"], ["Sensation", "Touch, pressure, pain, and temperature"], ["Function", "Barrier, sensation, and thermoregulation"]],
    contentSource: { label: "StatPearls: Anatomy, Skin", href: "https://www.ncbi.nlm.nih.gov/books/NBK441980/" },
    stories: [{ title: "From surface barrier to sensation", intro: "Move inward through the skin's layered architecture and see how a surface barrier connects to vessels, nerves, and appendages.", steps: [{ hotspotId: "epidermis", title: "1. Meet the barrier", detail: "The epidermis provides the outer keratinised barrier and contains no blood vessels." }, { hotspotId: "dermis", title: "2. Find support and sensation", detail: "The dermis houses vessels, nerves, glands, and connective tissue that support the epidermis." }, { hotspotId: "follicle", title: "3. Follow an appendage", detail: "A hair follicle is an epidermal structure that extends down into the dermis." }, { hotspotId: "hypodermis", title: "4. Reach the subcutaneous layer", detail: "The hypodermis cushions, insulates, and carries larger vessels and nerves over deeper tissues." }] }],
    relationships: [{ fromId: "epidermis", toId: "dermis", kind: "Adjacency", summary: "The avascular epidermis sits directly on the dermis and receives nutrients by diffusion from dermal vessels." }, { fromId: "dermis", toId: "follicle", kind: "Attachment", summary: "Hair follicles extend from epidermis into the dermis, where they associate with glands, nerves, and arrector pili muscles." }, { fromId: "dermis", toId: "hypodermis", kind: "Adjacency", summary: "The dermis transitions to subcutaneous tissue, which cushions the skin over deeper fascia and muscle." }],
    hotspots: [
      { id: "epidermis", label: "Epidermis", detail: "The outer epithelial layer of skin. Its keratinised surface forms the primary physical barrier.", position: [-0.05, 0.88, 1.4], color: "#ee7c6a" },
      { id: "dermis", label: "Dermis", detail: "A connective-tissue layer containing blood vessels, nerves, glands, and hair follicles.", position: [0.29, 0.05, 1.4], color: "#f2a33b" },
      { id: "hypodermis", label: "Hypodermis", detail: "Subcutaneous tissue beneath the dermis, often rich in adipose tissue and connective tissue.", position: [-0.39, -1.15, 1.4], color: "#6393d8" },
      { id: "follicle", label: "Hair follicle", detail: "An epidermal structure extending into the dermis that produces and anchors a hair shaft.", position: [0.89, -0.44, 1.4], color: "#d89bc4" },
    ],
  },
];

// Concise orientation notes for the exact landmarks shipped in the viewer.
// They support learning; they are not a substitute for a clinical atlas or advice.
export const landmarkProfiles: Record<string, LandmarkProfile> = {
  "heart.aorta": { what: "The body's largest artery.", location: "Begins at the left ventricle and continues from the ascending aorta through the arch and descending aorta.", function: "Carries oxygenated blood into systemic circulation.", relations: "Its root lies behind the sternum; the arch passes superior to the left main bronchus.", clinicalNote: "Aortic disease can affect blood flow to the body and requires specialist assessment." },
  "heart.left-atrium": { what: "The left upper chamber of the heart.", location: "Posterior part of the heart, receiving four pulmonary veins.", function: "Collects oxygenated blood from the lungs and delivers it to the left ventricle.", relations: "It lies anterior to the oesophagus and posterior to the aortic root.", clinicalNote: "Enlargement may occur when filling pressure is chronically elevated." },
  "heart.right-atrium": { what: "The right upper chamber of the heart.", location: "Right border of the heart, between the superior and inferior venae cavae.", function: "Receives systemic venous blood before it passes to the right ventricle.", relations: "The sinoatrial node is near the superior vena caval entry.", clinicalNote: "Its anatomy is important when placing central venous catheters." },
  "heart.left-ventricle": { what: "The thick-walled lower left chamber.", location: "Forms most of the left cardiac border and apex.", function: "Generates the pressure that drives systemic circulation.", relations: "Receives blood through the mitral valve and ejects it through the aortic valve.", clinicalNote: "Reduced pumping function can lead to symptoms of heart failure." },
  "heart.right-ventricle": { what: "The lower right pumping chamber.", location: "Most anterior cardiac chamber, behind the sternum.", function: "Pumps venous blood through the pulmonary valve into the pulmonary trunk.", relations: "It lies anterior to the left ventricle and is closely related to the diaphragm inferiorly.", clinicalNote: "It can be strained by sustained high pressure in the pulmonary circulation." },
  "heart.mitral": { what: "The left atrioventricular valve, with two leaflets.", location: "Between the left atrium and left ventricle.", function: "Allows forward flow into the ventricle and limits backflow during ventricular contraction.", relations: "Its leaflets are supported by chordae tendineae and papillary muscles.", clinicalNote: "Stenosis or regurgitation changes left-sided filling and flow." },
  "brain.frontal": { what: "The anterior lobe of each cerebral hemisphere.", location: "In front of the central sulcus and above the lateral sulcus.", function: "Supports executive function, behaviour, planning, and voluntary movement through primary motor cortex.", relations: "Its posterior border is the central sulcus; inferiorly it neighbours the temporal lobe.", clinicalNote: "Lesions can alter personality, planning, speech, or opposite-sided motor control." },
  "brain.parietal": { what: "The superior-posterior cerebral lobe.", location: "Behind the central sulcus and above the lateral sulcus.", function: "Integrates body sensation, spatial awareness, and attention.", relations: "It borders frontal lobe anteriorly and occipital lobe posteriorly.", clinicalNote: "Damage may produce neglect or difficulty interpreting sensory information." },
  "brain.temporal": { what: "The inferolateral cerebral lobe.", location: "Below the lateral sulcus, beside the temples.", function: "Processes sound and contributes to memory and language functions.", relations: "The hippocampal formation lies deep in its medial aspect.", clinicalNote: "Temporal lobe seizures can cause sensory or experiential symptoms." },
  "brain.cerebellum": { what: "A highly folded coordination centre of the hindbrain.", location: "Posterior cranial fossa, behind the brainstem and below the occipital lobes.", function: "Refines movement, posture, balance, and motor learning.", relations: "Connected to the brainstem by three cerebellar peduncles.", clinicalNote: "Injury commonly causes incoordination rather than paralysis." },
  "lungs.trachea": { what: "A cartilage-supported conducting airway.", location: "From the larynx in the neck to the carina in the thorax.", function: "Conducts and conditions air before it enters the main bronchi.", relations: "The oesophagus lies posterior to it; it divides at the carina.", clinicalNote: "Tracheal narrowing can seriously obstruct airflow." },
  "lungs.right-lung": { what: "The three-lobed right lung.", location: "Right pleural cavity, lateral to the mediastinum.", function: "Exchanges oxygen and carbon dioxide across alveoli.", relations: "It sits on the diaphragm; its main bronchus is wider and more vertical than the left.", clinicalNote: "Inhaled material more often enters the right main bronchus." },
  "lungs.left-lung": { what: "The two-lobed left lung.", location: "Left pleural cavity, lateral to the mediastinum.", function: "Exchanges oxygen and carbon dioxide across alveoli.", relations: "The cardiac notch accommodates the heart; the lingula projects from its upper lobe.", clinicalNote: "Its smaller size reflects the space occupied by the heart." },
  "lungs.bronchus": { what: "A main airway branch from the trachea.", location: "Begins at the carina and enters a lung at its hilum.", function: "Conducts air to lobar and then segmental bronchi.", relations: "Pulmonary vessels and bronchi meet at the hilum.", clinicalNote: "Obstruction may collapse or overinflate the lung segment beyond it." },
  "lungs.base": { what: "The inferior surface of a lung.", location: "Rests on the dome of the diaphragm.", function: "Moves with the diaphragm during ventilation.", relations: "The right base overlies the liver; the left base overlies stomach and spleen regions.", clinicalNote: "Fluid often collects at the lung bases in an upright person." },
  "liver.right-lobe": { what: "The larger anatomical lobe of the liver.", location: "Mostly in the right upper abdomen beneath the diaphragm.", function: "Performs metabolic, synthetic, storage, and detoxifying functions of hepatic tissue.", relations: "It contacts the diaphragm superiorly and right kidney posteriorly.", clinicalNote: "Its size can change in many liver conditions and is assessed clinically and by imaging." },
  "liver.left-lobe": { what: "The smaller anatomical lobe extending toward the left upper abdomen.", location: "Crosses the midline from the right lobe toward the left.", function: "Contains hepatic tissue with the same core functions as the rest of the liver.", relations: "It lies near the stomach and anterior abdominal wall.", clinicalNote: "It may be prominent in normal anatomical variation." },
  "liver.portal": { what: "A large vein of the portal circulation.", location: "Enters the liver at the porta hepatis.", function: "Brings nutrient-rich venous blood from the gut and spleen to the liver.", relations: "It travels in the hepatoduodenal ligament with the hepatic artery and bile duct.", clinicalNote: "Raised portal pressure can lead to collateral venous pathways." },
  "kidneys.cortex": { what: "The outer layer of renal tissue.", location: "Immediately deep to the renal capsule and extending between medullary pyramids.", function: "Contains renal corpuscles and tubules where filtration and early processing occur.", relations: "It surrounds the renal medulla and continues inward as renal columns.", clinicalNote: "Cortical thickness is one feature considered when assessing chronic kidney disease." },
  "kidneys.medulla": { what: "The inner region of the kidney, arranged in pyramids.", location: "Deep to the cortex, with papillae projecting toward calyces.", function: "Helps establish gradients that concentrate urine.", relations: "Its papillae drain into minor calyces; pyramids are separated by renal columns.", clinicalNote: "The medulla is especially vulnerable when renal blood flow is severely reduced." },
  "kidneys.ureter": { what: "A muscular tube carrying urine to the bladder.", location: "From the renal pelvis down the posterior abdominal wall into the pelvis.", function: "Propels urine by peristalsis.", relations: "It crosses the pelvic brim and enters the bladder obliquely.", clinicalNote: "Stones can lodge at natural narrowings along its course." },
  "eyeball.cornea": { what: "The transparent front part of the fibrous outer coat of the eye.", location: "At the anterior surface, continuous with sclera at the limbus.", function: "Provides a major part of the eye's refraction of light.", relations: "It overlies the anterior chamber, iris, and pupil.", clinicalNote: "Its clarity is essential for vision; injury can be painful and sight-threatening." },
  "eyeball.iris": { what: "The coloured muscular diaphragm of the eye.", location: "Behind the cornea and in front of the lens.", function: "Changes pupil size to regulate entering light.", relations: "Its central opening is the pupil; its root attaches near the ciliary body.", clinicalNote: "Pupil shape and reactivity provide important neurological clues." },
  "eyeball.optic": { what: "The second cranial nerve carrying visual signals.", location: "Leaves the back of the eye and travels through the optic canal toward the chiasm.", function: "Transmits retinal ganglion-cell axons to central visual pathways.", relations: "It is surrounded by meningeal coverings and cerebrospinal fluid.", clinicalNote: "Raised intracranial pressure can be reflected at the optic disc." },
  "intestine.duodenum": { what: "The first section of the small intestine.", location: "C-shaped around the head of the pancreas, mostly retroperitoneal.", function: "Receives gastric contents, bile, and pancreatic secretions for early digestion.", relations: "Its second part receives the bile and pancreatic ducts.", clinicalNote: "Its close relationship to the pancreas matters in pancreatic and biliary disease." },
  "intestine.jejunum": { what: "The middle portion of the small intestine.", location: "Usually occupies much of the upper-left abdominal cavity.", function: "Absorbs a substantial proportion of nutrients and water.", relations: "Suspended by mesentery containing vessels, lymphatics, and nerves.", clinicalNote: "Reduced absorptive surface can contribute to nutritional deficiency." },
  "intestine.colon": { what: "The major portion of the large intestine.", location: "Frames the small intestine from caecum to rectum.", function: "Absorbs water and electrolytes and compacts intestinal contents into stool.", relations: "Its segments relate to the liver, spleen, kidneys, and abdominal wall.", clinicalNote: "Screening and assessment can detect important colonic disease early." },
  "pancreas.head": { what: "The broad right-sided part of the pancreas.", location: "Nestled in the C-shaped curve of the duodenum.", function: "Contains exocrine and endocrine tissue supporting digestion and glucose regulation.", relations: "The common bile duct passes in a groove or tunnel behind it.", clinicalNote: "A mass here may obstruct bile flow and cause jaundice." },
  "pancreas.body": { what: "The central portion of the pancreas.", location: "Crosses the upper abdomen behind the stomach.", function: "Contributes pancreatic enzymes, bicarbonate, insulin, and glucagon.", relations: "It lies anterior to major retroperitoneal vessels and near the splenic vein.", clinicalNote: "Inflammation can affect nearby vessels and surrounding tissues." },
  "pancreas.tail": { what: "The narrow left end of the pancreas.", location: "Extends toward the hilum of the spleen.", function: "Contains both exocrine tissue and endocrine islets.", relations: "It lies within the splenorenal ligament near splenic vessels.", clinicalNote: "Its deep position can make abnormalities difficult to detect early." },
  "pancreas.duct": { what: "The main channel for exocrine pancreatic secretion.", location: "Runs through the pancreas toward the duodenum.", function: "Delivers enzyme-rich secretions and bicarbonate into the small intestine.", relations: "It commonly joins the bile duct near the major duodenal papilla.", clinicalNote: "Duct blockage can contribute to pancreatitis or impaired drainage." },
  "skin.epidermis": { what: "The outer keratinised epithelial layer of skin.", location: "Forms the surface barrier over the body.", function: "Limits water loss and helps resist mechanical, chemical, and microbial injury.", relations: "It is avascular and receives nutrients by diffusion from the dermis beneath it.", clinicalNote: "Barrier disruption increases infection and fluid-loss risk." },
  "skin.dermis": { what: "The connective-tissue layer beneath epidermis.", location: "Between the epidermis and subcutaneous tissue.", function: "Provides strength, elasticity, sensation, and support for vessels and appendages.", relations: "Contains hair follicles, glands, nerves, and vascular networks.", clinicalNote: "Many inflammatory skin changes involve the dermis." },
  "skin.hypodermis": { what: "Subcutaneous tissue beneath the dermis.", location: "Deep to the skin, overlying fascia and muscle.", function: "Provides cushioning, insulation, energy storage, and a pathway for vessels and nerves.", relations: "Its thickness varies by body region, age, and body composition.", clinicalNote: "It is a common site for subcutaneous injections." },
  "skin.follicle": { what: "A tubular epidermal structure that produces a hair.", location: "Extends from the epidermis into the dermis, sometimes into subcutaneous tissue.", function: "Anchors and forms the hair shaft.", relations: "Associated with sebaceous glands and arrector pili muscle.", clinicalNote: "Follicular inflammation can cause common skin conditions such as folliculitis." },
};

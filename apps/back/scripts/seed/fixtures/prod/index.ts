import { randomUUID } from 'node:crypto';
import { join } from 'node:path';
import { Role, VisibilityType } from '../../../../src/generated/prisma/enums';
import { hashPassword } from '../../../../src/utils/password';
import type { SeedConfig } from '../../types';

const samplesDir = join(process.cwd(), 'samples');
const avatarsDir = join(process.cwd(), 'avatars');
const tracksDir = join(process.cwd(), 'tracks');

const artistPassword = await hashPassword('Producteur42');

export const prodConfig: SeedConfig = {
  avatars: [
    { artistName: 'Alexoos', file: join(avatarsDir, 'alex.jpeg') },
    { artistName: 'Jububibi', file: join(avatarsDir, 'julien.webp') },
  ],
  cleanupDirs: ['avatars', 'samples', 'tracks'],
  conversations: [
    {
      messages: [
        {
          author: 'Jububibi',
          content: "Yo ! T'as eu le temps d'écouter le truc que je t'ai envoyé hier ?",
        },
        {
          author: 'Alexoos',
          content: 'Ouais, le kick est propre. Par contre ta basse mange tout le bas du spectre',
        },
        {
          author: 'Jububibi',
          content: 'Je me disais aussi. Je coupe en dessous de 80 Hz et je te renvoie ça',
        },
      ],
      participants: ['Jububibi', 'Alexoos'],
    },
    {
      messages: [
        { author: 'Maya', content: 'Coucou ! Ça va toi ?' },
        {
          author: 'Loprima',
          content:
            "Ça va ! Je galère sur une prod depuis ce matin, j'arrive pas à trouver la mélodie",
        },
        { author: 'Maya', content: 'Envoie la boucle, je te chante un truc dessus ce soir' },
        { author: 'Loprima', content: 'Ah oui carrément, merci !' },
      ],
      participants: ['Maya', 'Loprima'],
    },
    {
      messages: [
        {
          author: 'Sifex',
          content: 'Salut ! Question de débutant : je mets la reverb avant ou après le delay ?',
        },
        {
          author: 'Alexoos',
          content: "Il n'y a pas de règle, mais delay puis reverb ça sonne plus naturel",
        },
        { author: 'Sifex', content: 'Ok je teste ce soir. Merci !' },
      ],
      participants: ['Sifex', 'Alexoos'],
    },
    {
      messages: [
        { author: 'Sifex', content: "T'as vu le nouveau pack de samples sur la plateforme ?" },
        { author: 'Jububibi', content: 'Pas encore, il y a quoi dedans ?' },
        {
          author: 'Sifex',
          content: "Que des boucles de batterie. J'ai déjà fait deux instrus avec",
        },
      ],
      participants: ['Sifex', 'Jububibi'],
    },
    {
      messages: [
        { author: 'Loprima', content: 'Hello ! Je peux te poser une question sur le studio ?' },
        { author: 'Alexoos', content: 'Vas-y' },
        {
          author: 'Loprima',
          content:
            "Quand j'exporte, le son est beaucoup plus faible que dans le navigateur, c'est normal ?",
        },
        {
          author: 'Alexoos',
          content:
            'Regarde ton master, tu dois clipper avant. Baisse les pistes de 3 dB et réessaie',
        },
      ],
      participants: ['Loprima', 'Alexoos'],
    },
    {
      messages: [
        {
          author: 'Nyxette',
          content: "Salut ! J'ai écouté ton dernier morceau, la voix est magnifique",
        },
        { author: 'Maya', content: 'Merci beaucoup ! Enregistrée avec un micro à 40 balles hein' },
        { author: 'Nyxette', content: "Ça s'entend pas du tout, bien joué" },
      ],
      participants: ['Nyxette', 'Maya'],
    },
    {
      messages: [
        {
          author: 'Bruit Doux',
          content: "Yo, tu serais chaud pour une collab ? J'ai une boucle de piano qui traîne",
        },
        { author: 'Jububibi', content: 'Toujours. Tu me files le projet ou juste le stem ?' },
        { author: 'Bruit Doux', content: "Je t'envoie le projet, tu feras ce que tu veux avec" },
      ],
      participants: ['Bruit Doux', 'Jububibi'],
    },
    {
      messages: [
        { author: 'DJ Radiateur', content: 'Comment vas-tu ? Ça fait un bail' },
        {
          author: 'Tonton Wav',
          content: "Tranquille ! Je remets le nez dans la techno, j'ai un live dans trois semaines",
        },
        { author: 'DJ Radiateur', content: 'Passe-moi ta tracklist quand elle est prête' },
      ],
      participants: ['DJ Radiateur', 'Tonton Wav'],
    },
    {
      messages: [
        {
          author: 'Vigie',
          content:
            "Bonjour ! Petit message de modération : un de tes samples publics porte encore le nom d'un morceau commercial",
        },
        { author: 'Loprima', content: 'Ah oui pardon, je le renomme et je le repasse en privé' },
        { author: 'Vigie', content: 'Parfait, rien de grave. Bonne prod !' },
      ],
      participants: ['Vigie', 'Loprima'],
    },
  ],
  follows: {
    Alexoos: ['Jububibi', 'Maya', 'Loprima', 'Nyxette'],
    'Bruit Doux': ['Jububibi', 'Alexoos'],
    'DJ Radiateur': ['Tonton Wav', 'Alexoos'],
    Jububibi: ['Sifex', 'Alexoos', 'Bruit Doux'],
    Kasper: ['Jububibi', 'Sifex'],
    Loprima: ['Alexoos', 'Maya', 'Plume', 'Kasper'],
    Maya: ['Alexoos', 'Loprima', 'Mélo', 'Plume'],
    Mélo: ['Maya', 'Loprima'],
    Nyxette: ['Alexoos', 'Maya', 'Vigie'],
    Plume: ['Maya', 'Loprima', 'Nyxette'],
    Sifex: ['Alexoos', 'Jububibi', 'DJ Radiateur'],
    'Tonton Wav': ['Sifex', 'DJ Radiateur'],
    Vigie: ['Alexoos', 'Jububibi', 'Maya', 'Loprima', 'Sifex'],
  },
  mediaDir: '/var/www/media',
  sampleSets: [
    {
      dir: join(samplesDir, 'platform'),
      owner: 'PLATFORM',
      visibility: VisibilityType.PUBLIC,
    },
    {
      dir: join(samplesDir, 'alex'),
      owner: { artistName: 'Alexoos' },
      visibility: VisibilityType.PRIVATE,
    },
    {
      dir: join(samplesDir, 'julien'),
      owner: { artistName: 'Jububibi' },
      visibility: (index) => (index % 2 === 0 ? VisibilityType.PUBLIC : VisibilityType.SHARED),
    },
  ],
  tracks: [
    {
      description: 'Un truc lent, écrit un soir de novembre.',
      file: join(tracksDir, 'At night.wav'),
      owner: { artistName: 'Alexoos' },
      title: 'At night',
      visibility: VisibilityType.PUBLIC,
    },
    {
      description: 'Trois accords et une lampe à huile.',
      file: join(tracksDir, 'Genie in a lamp.wav'),
      owner: { artistName: 'Alexoos' },
      title: 'Genie in a lamp',
      visibility: VisibilityType.PUBLIC,
    },
    {
      description: "Le morceau dont je n'arrive pas à finir le mix.",
      file: join(tracksDir, 'Mirror.wav'),
      owner: { artistName: 'Alexoos' },
      title: 'Mirror',
      visibility: VisibilityType.PUBLIC,
    },
    {
      description: 'Esquisse de trente secondes pour tester la plateforme.',
      file: join(tracksDir, 'MakeSomeNoise demo.wav'),
      owner: { artistName: 'Alexoos' },
      title: 'MakeSomeNoise demo',
      visibility: VisibilityType.PRIVATE,
    },
  ],
  users: [
    {
      artistName: 'Alexoos',
      avatarUpdatedAt: null,
      bio: 'Tente des trucs',
      email: 'afaugero@makesomenoise.com',
      firstname: 'Alexis',
      handle: 'alexoos',
      id: randomUUID(),
      lastname: 'Faugeroux',
      links: [
        {
          kind: 'soundcloud',
          url: 'https://soundcloud.com/profile/afaugero',
        },
      ],
      location: 'Paris, FR',
      password: await hashPassword('JeSuisUneTomate'),
      role: Role.ADMIN,
    },
    {
      artistName: 'Maya',
      avatarUpdatedAt: null,
      bio: 'Toujours une mélodie en tête',
      email: 'maya@makesomenoise.com',
      firstname: 'Maya-Line',
      handle: 'maya',
      id: randomUUID(),
      lastname: 'PELAGE',
      links: [
        {
          kind: 'instagram',
          url: 'https://instagram.com/_.mayaline._',
        },
      ],
      location: 'Villeparisis, FR',
      password: await hashPassword('Shattamada'),
      role: Role.ADMIN,
    },
    {
      artistName: 'Jububibi',
      avatarUpdatedAt: null,
      bio: 'Creatif a au potentiel',
      email: 'agentDejububibi@makesomenoise.com',
      firstname: 'Julien',
      handle: 'jubu',
      id: randomUUID(),
      lastname: 'Bayonne Chenard',
      location: 'Paris, FR',
      password: await hashPassword('0123biensecure'),
      role: Role.ADMIN,
    },
    {
      artistName: 'Sifex',
      avatarUpdatedAt: null,
      bio: 'Debutant sans temps et argent',
      email: 'anaudibe@makesomenoise.com',
      firstname: 'Antoine',
      handle: 'sifx',
      id: randomUUID(),
      lastname: 'Audibert',
      location: 'Massy, FR',
      password: await hashPassword('TroisPetitesTruitesCuites'),
      role: Role.ADMIN,
    },
    {
      artistName: 'Loprima',
      avatarUpdatedAt: null,
      bio: 'Passion musique 🎶✨',
      email: 'loprima@makesomenoise.com',
      firstname: 'Naëlle',
      handle: 'loprima',
      id: randomUUID(),
      lastname: 'VILMAIN',
      location: 'Paris, FR',
      password: await hashPassword('Plop!Plop!'),
      role: Role.ADMIN,
    },
    {
      artistName: 'Vigie',
      avatarUpdatedAt: null,
      bio: 'Modération le jour, ambient la nuit.',
      email: 'vigie@makesomenoise.com',
      firstname: 'Sarah',
      handle: 'snguyen',
      id: randomUUID(),
      lastname: 'Nguyen',
      location: 'Paris, FR',
      password: artistPassword,
      role: Role.MODERATOR,
    },
    {
      artistName: 'Nyxette',
      avatarUpdatedAt: null,
      bio: 'Textures granulaires et vieux synthés.',
      email: 'camille@makesomenoise.com',
      firstname: 'Camille',
      handle: 'crousse',
      id: randomUUID(),
      lastname: 'Roussel',
      location: 'Lyon, FR',
      password: artistPassword,
      role: Role.ARTIST,
    },
    {
      artistName: 'Bruit Doux',
      avatarUpdatedAt: null,
      bio: 'Boom bap et samples de vinyles poussiéreux.',
      email: 'sofiane@makesomenoise.com',
      firstname: 'Sofiane',
      handle: 'sbelkace',
      id: randomUUID(),
      lastname: 'Belkacem',
      links: [
        {
          kind: 'soundcloud',
          url: 'https://soundcloud.com/bruitdoux',
        },
      ],
      location: 'Marseille, FR',
      password: artistPassword,
      role: Role.ARTIST,
    },
    {
      artistName: 'Tonton Wav',
      avatarUpdatedAt: null,
      bio: "Je fais des kicks trop forts et je m'en excuse pas.",
      email: 'hugo@makesomenoise.com',
      firstname: 'Hugo',
      handle: 'hlemaitr',
      id: randomUUID(),
      lastname: 'Lemaître',
      location: 'Nantes, FR',
      password: artistPassword,
      role: Role.ARTIST,
    },
    {
      artistName: 'Mélo',
      avatarUpdatedAt: null,
      bio: 'Piano, voix, et beaucoup trop de reverb.',
      email: 'ines@makesomenoise.com',
      firstname: 'Inès',
      handle: 'ibarbier',
      id: randomUUID(),
      lastname: 'Barbier',
      links: [
        {
          kind: 'instagram',
          url: 'https://instagram.com/melo.piano',
        },
      ],
      location: 'Toulouse, FR',
      password: artistPassword,
      role: Role.ARTIST,
    },
    {
      artistName: 'DJ Radiateur',
      avatarUpdatedAt: null,
      bio: 'Techno de cave. Chaud devant.',
      email: 'thomas@makesomenoise.com',
      firstname: 'Thomas',
      handle: 'tverret',
      id: randomUUID(),
      lastname: 'Verret',
      links: [
        {
          kind: 'bandcamp',
          url: 'https://djradiateur.bandcamp.com',
        },
      ],
      location: 'Lille, FR',
      password: artistPassword,
      role: Role.ARTIST,
    },
    {
      artistName: 'Plume',
      avatarUpdatedAt: null,
      bio: 'Lo-fi pour réviser (ou pas).',
      email: 'lea@makesomenoise.com',
      firstname: 'Léa',
      handle: 'lfontain',
      id: randomUUID(),
      lastname: 'Fontaine',
      location: 'Bordeaux, FR',
      password: artistPassword,
      role: Role.ARTIST,
    },
    {
      artistName: 'Kasper',
      avatarUpdatedAt: null,
      bio: "Drum & bass depuis la chambre d'ami.",
      email: 'yanis@makesomenoise.com',
      firstname: 'Yanis',
      handle: 'ymoreau',
      id: randomUUID(),
      lastname: 'Moreau',
      location: 'Villeurbanne, FR',
      password: artistPassword,
      role: Role.ARTIST,
    },
  ],
};

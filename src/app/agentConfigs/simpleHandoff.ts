import {
  RealtimeAgent,
} from '@openai/agents/realtime';

export const haikuWriterAgent = new RealtimeAgent({
  name: 'haikuWriter',
  voice: 'sage',
  instructions:
    'Spurðu notenda um eitthvað mjög íslenskt , og svo gera smá brandara, alltaf tala skýra og fallega íslensku.',
  handoffs: [],
  tools: [],
  handoffDescription: 'Þjónustufulltrúi sem getur skrifað ljóð og brandara',
});

export const greeterAgent = new RealtimeAgent({
  name: 'greeter',
  voice: 'sage',
  instructions:
    "Þú ert hjálpsamur nýr þjónustufulltrúi. Hlutverk þitt er að heilsa notandanum á íslensku og vísa honum á réttan sérfræðing sem getur hjálpað honum frekar.\n\n" +
    'Þú ert mjög nýr og getur aðeins sinnt einföldum verkefnum, og treystir mikið á yfirmanninn með getNextResponseFromSupervisor verkfærið.\n\n' +
  handoffs: [haikuWriterAgent],
  tools: [],
  handoffDescription: 'Agent that greets the user',
});

export const simpleHandoffScenario = [greeterAgent, haikuWriterAgent];

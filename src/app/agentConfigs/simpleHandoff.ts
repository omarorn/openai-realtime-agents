import {
  RealtimeAgent,
} from '@openai/agents/realtime';

export const haikuWriterAgent = new RealtimeAgent({
  name: 'haikuWriter',
  voice: 'sage',
  instructions:
    'þú spyrð um viðfansefi og gerir svo fallegt ljóð um það, .',
  handoffs: [],
  tools: [],
  handoffDescription: 'Þjónustufulltrúi sem getur skrifað ljóð um viðfangsefni sem notandi spyr um',
});

export const greeterAgent = new RealtimeAgent({
  name: 'greeter',
  voice: 'sage',
  instructions:
    "Þú ert hjálpsamur nýr þjónustufulltrúi. Hlutverk þitt er að heilsa notandanum á íslensku og vísa honum á réttan sérfræðing sem getur hjálpað honum frekar.\n\n" ,
  handoffs: [haikuWriterAgent],
  tools: [],
  handoffDescription: 'Agent that greets the user',
});

export const simpleHandoffScenario = [greeterAgent, haikuWriterAgent];

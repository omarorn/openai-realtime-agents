import { RealtimeItem, tool } from '@openai/agents/realtime';


import {
  exampleAccountInfo,
  examplePolicyDocs,
  exampleStoreLocations,
} from './sampleData';

export const supervisorAgentInstructions = `Þú ert sérfræðingur í þjónustu við viðskiptavini og hefur það hlutverk að veita rauntímaleiðbeiningar til yngri þjónustufulltrúa sem spjallar beint við viðskiptavininn. Þú færð nákvæmar leiðbeiningar um svör, verkfæri og alla samtalssöguna hingað til, og þú átt að búa til rétt næsta skilaboð sem yngri þjónustufulltrúinn getur lesið beint.

# Leiðbeiningar
- Þú getur svarað beint eða notað verkfæri fyrst og síðan svarað spurningunni
- Ef þú þarft að nota verkfæri en hefur ekki réttar upplýsingar, getur þú sagt yngri þjónustufulltrúanum að biðja um þær upplýsingar í skilaboðunum þínum
- Skilaboðin þín verða lesin orðrétt af yngri þjónustufulltrúanum, svo þú mátt nota þau eins og þú myndir tala beint við notandann
  
==== Sérhæfðar leiðbeiningar fyrir umboðsmann ====
Þú ert hjálpsamur þjónustufulltrúi hjá vertis og hjálpar notanda að uppfylla beiðni sína á skilvirkan hátt og fylgir leiðbeiningum nákvæmlega.


# Leiðbeiningar
- Heilsaðu alltaf notandanum í upphafi samtals með „Hæ, Vertis góðan dag, hvernig get ég hjálpað.?“
- Notaðu alltaf verkfæri áður en þú svarar staðreyndaspurningum um fyrirtækið, þjónustu þess eða vörur, eða um reikning notanda. Notaðu eingöngu fengnar upplýsingar og aldrei þína eigin þekkingu fyrir þessar spurningar.
- Sendu áfram til starfsmanns ef notandinn óskar eftir því.
- Ekki ræða bönnuð efni (stjórnmál, trúarbrögð, umdeild nútíma atvik, læknisfræðileg, lagaleg eða fjármálaráðgjöf, persónuleg samtöl, innri starfsemi fyrirtækisins eða gagnrýni á fólk eða fyrirtæki).
- Notaðu dæmasetningar þegar það á við, en aldrei endurtaka sömu setningu í sama samtali. Þú mátt breyta dæmasetningum til að forðast endurtekningu og gera þær viðeigandi fyrir notandann.
- Fylgdu alltaf gefnu útlitsformi fyrir ný skilaboð, þar með talið tilvísunum fyrir staðreyndayfirlýsingar úr fengnum stefnu skjölum.

# Leiðbeiningar fyrir svör
- Haltu faglegum og stuttum tón í öllum svörum.
- Svaraðu í samræmi við ofangreindar leiðbeiningar.
- Skilaboðin eru fyrir raddsamræður, svo vertu mjög stuttur, notaðu samfelldan texta og aldrei punktalista. Forgangsraðaðu stuttum og skýrum svörum umfram ítarleg svör.
    - Jafnvel þótt þú hafir aðgang að fleiri upplýsingum, nefndu aðeins helstu atriði og takmarkaðu restina við stutta samantekt.
- Ekki giska eða gera ráð fyrir getu eða upplýsingum. Ef ekki er hægt að uppfylla beiðni með tiltækum verkfærum eða upplýsingum, hafnaðu kurteislega og bjóðaðu að senda áfram til starfsmanns.
- Ef þér vantar allar nauðsynlegar upplýsingar til að nota verkfæri, VERÐUR þú að biðja notandann um vantar upplýsingar í skilaboðunum þínum. ALDREI reyna að nota verkfæri með vantar, tómum, staðgengils- eða sjálfgefnum gildum (eins og "", "NAUÐSYNLEGT", "null" eða svipuðu). Notaðu aðeins verkfæri þegar allar nauðsynlegar breytur eru veittar af notanda.
- Ekki bjóða eða reyna að uppfylla beiðnir um þjónustu eða getu sem ekki er sérstaklega studd af verkfærum þínum eða veittum upplýsingum.
- Bjóða aðeins upp á frekari upplýsingar ef þú veist að það eru til frekari upplýsingar til að veita, byggt á verkfærum og samhengi sem þú hefur.
    - Þegar hægt er, gefðu upp nákvæmar tölur eða upphæðir til að styðja svarið þitt.

# Dæmasetningar
## Að vísa frá bönnuðu efni
- „Því miður get ég ekki rætt það efni. Er eitthvað annað sem ég get aðstoðað með?“
- „Það er ekki eitthvað sem ég get veitt upplýsingar um, en ég er tilbúinn að hjálpa með aðrar spurningar sem þú kannt að hafa.“

## Ef þú hefur ekki verkfæri eða upplýsingar til að uppfylla beiðni
- „Því miður get ég ekki gert það. Viltu að ég tengi þig við einhvern sem getur aðstoðað, eða hjálpa þér að finna næsta Vertis verslun?“
- „Ég get ekki aðstoðað með þessa beiðni. Viltu tala við starfsmann eða viltu fá aðstoð við að finna næstu Vertis verslun?“

## Áður en þú notar verkfæri
- „Til að aðstoða þig með þetta þarf ég að staðfesta upplýsingar þínar.“
- „Leyfðu mér að athuga þetta fyrir þig—eina stund, takk.“
- „Ég mun sækja nýjustu upplýsingar fyrir þig núna.“

## Ef vantar upplýsingar fyrir verkfærakall
- „Til að aðstoða þig með þetta, gætirðu gefið mér [nauðsynlegar upplýsingar, t.d. póstnúmer/símanúmer]?“
- „Ég þarf [nauðsynlegar upplýsingar] til að halda áfram. Gætirðu deilt því með mér?“

# Útlit notandaskilaboða
- Alltaf innihalda loka svar þitt til notanda.
- Þegar þú veitir staðreyndaupplýsingar úr fengnu samhengi, settu alltaf tilvísanir strax á eftir viðeigandi yfirlýsingu(m). Notaðu eftirfarandi tilvísunarform:
    - Fyrir eina heimild: [NAFN](ID)
    - Fyrir margar heimildir: [NAFN](ID), [NAFN](ID)
- Veittu aðeins upplýsingar um þetta fyrirtæki, stefnu þess, vörur eða reikning viðskiptavinar, og aðeins ef það byggir á upplýsingum sem eru veittar í samhengi. Ekki svara spurningum utan þessa sviðs.

# Example (tool call)
- User: Can you tell me about your family plan options?
- Supervisor Assistant: lookup_policy_document(topic="family plan options")
- lookup_policy_document(): [
  {
    id: "ID-010",
    name: "Family Plan Policy",
    topic: "family plan options",
    content:
      "The family plan allows up to 5 lines per account. All lines share a single data pool. Each additional line after the first receives a 10% discount. All lines must be on the same account.",
  },
  {
    id: "ID-011",
    name: "Unlimited Data Policy",
    topic: "unlimited data",
    content:
      "Unlimited data plans provide high-speed data up to 50GB per month. After 50GB, speeds may be reduced during network congestion. All lines on a family plan share the same data pool. Unlimited plans are available for both individual and family accounts.",
  },
];
- Supervisor Assistant:
# Message
Yes we do—up to five lines can share data, and you get a 10% discount for each new line [Family Plan Policy](ID-010).

# Example (Refusal for Unsupported Request)
- User: Can I make a payment over the phone right now?
- Supervisor Assistant:
# Message
I'm sorry, but I'm not able to process payments over the phone. Would you like me to connect you with a human representative, or help you find your nearest vertis store for further assistance?
`;

export const supervisorAgentTools = [
  {
    type: "function",
    name: "lookupPolicyDocument",
    description:
      "Tool to look up internal documents and policies by topic or keyword.",
    parameters: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          description:
            "The topic or keyword to search for in company policies or documents.",
        },
      },
      required: ["topic"],
      additionalProperties: false,
    },
  },
  {
    type: "function",
    name: "getUserAccountInfo",
    description:
      "Tool to get user account information. This only reads user accounts information, and doesn't provide the ability to modify or delete any values.",
    parameters: {
      type: "object",
      properties: {
        phone_number: {
          type: "string",
          description:
            "Formatted as '(xxx) xxx-xxxx'. MUST be provided by the user, never a null or empty string.",
        },
      },
      required: ["phone_number"],
      additionalProperties: false,
    },
  },
  {
    type: "function",
    name: "findNearestStore",
    description:
      "Tool to find the nearest store location to a customer, given their zip code.",
    parameters: {
      type: "object",
      properties: {
        zip_code: {
          type: "string",
          description: "The customer's 5-digit zip code.",
        },
      },
      required: ["zip_code"],
      additionalProperties: false,
    },
  },
];

async function fetchResponsesMessage(body: any) {
  const response = await fetch('/api/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Preserve the previous behaviour of forcing sequential tool calls.
    body: JSON.stringify({ ...body, parallel_tool_calls: false }),
  });

  if (!response.ok) {
    console.warn('Server returned an error:', response);
    return { error: 'Something went wrong.' };
  }

  const completion = await response.json();
  return completion;
}

function getToolResponse(fName: string) {
  switch (fName) {
    case "getUserAccountInfo":
      return exampleAccountInfo;
    case "lookupPolicyDocument":
      return examplePolicyDocs;
    case "findNearestStore":
      return exampleStoreLocations;
    default:
      return { result: true };
  }
}

/**
 * Iteratively handles function calls returned by the Responses API until the
 * supervisor produces a final textual answer. Returns that answer as a string.
 */
async function handleToolCalls(
  body: any,
  response: any,
  addBreadcrumb?: (title: string, data?: any) => void,
) {
  let currentResponse = response;

  while (true) {
    if (currentResponse?.error) {
      return { error: 'Something went wrong.' } as any;
    }

    const outputItems: any[] = currentResponse.output ?? [];

    // Gather all function calls in the output.
    const functionCalls = outputItems.filter((item) => item.type === 'function_call');

    if (functionCalls.length === 0) {
      // No more function calls – build and return the assistant's final message.
      const assistantMessages = outputItems.filter((item) => item.type === 'message');

      const finalText = assistantMessages
        .map((msg: any) => {
          const contentArr = msg.content ?? [];
          return contentArr
            .filter((c: any) => c.type === 'output_text')
            .map((c: any) => c.text)
            .join('');
        })
        .join('\n');

      return finalText;
    }

    // For each function call returned by the supervisor model, execute it locally and append its
    // output to the request body as a `function_call_output` item.
    for (const toolCall of functionCalls) {
      const fName = toolCall.name;
      const args = JSON.parse(toolCall.arguments || '{}');
      const toolRes = getToolResponse(fName);

      // Since we're using a local function, we don't need to add our own breadcrumbs
      if (addBreadcrumb) {
        addBreadcrumb(`[supervisorAgent] function call: ${fName}`, args);
      }
      if (addBreadcrumb) {
        addBreadcrumb(`[supervisorAgent] function call result: ${fName}`, toolRes);
      }

      // Add function call and result to the request body to send back to realtime
      body.input.push(
        {
          type: 'function_call',
          call_id: toolCall.call_id,
          name: toolCall.name,
          arguments: toolCall.arguments,
        },
        {
          type: 'function_call_output',
          call_id: toolCall.call_id,
          output: JSON.stringify(toolRes),
        },
      );
    }

    // Make the follow-up request including the tool outputs.
    currentResponse = await fetchResponsesMessage(body);
  }
}

export const getNextResponseFromSupervisor = tool({
  name: 'getNextResponseFromSupervisor',
  description:
    'Determines the next response whenever the agent faces a non-trivial decision, produced by a highly intelligent supervisor agent. Returns a message describing what to do next.',
  parameters: {
    type: 'object',
    properties: {
      relevantContextFromLastUserMessage: {
        type: 'string',
        description:
          'Key information from the user described in their most recent message. This is critical to provide as the supervisor agent with full context as the last message might not be available. Okay to omit if the user message didn\'t add any new information.',
      },
    },
    required: ['relevantContextFromLastUserMessage'],
    additionalProperties: false,
  },
  execute: async (input, details) => {
    const { relevantContextFromLastUserMessage } = input as {
      relevantContextFromLastUserMessage: string;
    };

    const addBreadcrumb = (details?.context as any)?.addTranscriptBreadcrumb as
      | ((title: string, data?: any) => void)
      | undefined;

    const history: RealtimeItem[] = (details?.context as any)?.history ?? [];
    const filteredLogs = history.filter((log) => log.type === 'message');

    const body: any = {
      model: 'gpt-4.1',
      input: [
        {
          type: 'message',
          role: 'system',
          content: supervisorAgentInstructions,
        },
        {
          type: 'message',
          role: 'user',
          content: `==== Conversation History ====
          ${JSON.stringify(filteredLogs, null, 2)}
          
          ==== Relevant Context From Last User Message ===
          ${relevantContextFromLastUserMessage}
          `,
        },
      ],
      tools: supervisorAgentTools,
    };

    const response = await fetchResponsesMessage(body);
    if (response.error) {
      return { error: 'Something went wrong.' };
    }

    const finalText = await handleToolCalls(body, response, addBreadcrumb);
    if ((finalText as any)?.error) {
      return { error: 'Something went wrong.' };
    }

    return { nextResponse: finalText as string };
  },
});
  
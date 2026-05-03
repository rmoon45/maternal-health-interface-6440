import axios from 'axios';

const API_KEY = 'API_KEY';

export const generateSummary = (form: String) => {
  const response = queryLLM("The patient is an expecting mother that is using a maternal health monitoring app. These are patient responses to a questionnaire. Using the responses, generate a 1-3 word summary of the most important symptoms that were reported." + form);
  return response;
};

export const generateObservation = (form: String) => {
  const response = queryLLM("The patient is an expecting mother that is using a maternal health monitoring app. These are patient responses to a questionnaire. Using the responses, generate an Observation using the FHIR standard. Make sure the Observation is in a json format. Don't have any other words other than the json file." + form);
  return response;
};


const queryLLM = async (prompt: string) => {
  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages: [
          { role: "system", content: "You are a healthcare assistant that converts questionnaire answers into medical observations using the FHIR standard." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${API-KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const reply = res.data.choices[0].message.content;
    // console.log("\ud83e\udd16 Response:", reply);
    return reply
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
  }
};


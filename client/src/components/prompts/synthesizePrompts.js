const synthesizePrompts = [
    { name: "Pain Points", template: "Create a bullet point list of pain points from this recording transcript: " },
    { name: "Key Takeaways", template: "Create a bullet point list of key takeaways from this recording transcript: " },
    { name: "Customers language", template: "Create a bullet point list of customer language from this recording transcript. Pay special attention to idioms, common sayings, slang, jargon and tone: " },
    { name: "Customer Profile", template: "Write up to 3 basic customer profiles that combine information from each of these individual customer transcripts. Include the following categories: Current Occupation, 1 Year Goal, Fears, Aspirations: " },
    { name: "Day in the Life", template: "Synthesize the following transcripts to create a single customer profile from these recording transcript. Use this single customer profile to write a day in that avatar's life. Include the following categories: Morning Routine, Work Day, After Work, Evening Routine. Talk about what they day dream about: " },
    { name: "Current Situation/Desired Situation", template: "Imagine an avatar that best represents all of these customers. Create a one sentence description of the avatar's current situation and their desired situation. For example, your response might be: Current Situation: Working a dead end job they hate Desired Situation: Working a job that they feel fullfilled and full of joy to do everyday. The Transcript: " },
    { name: "Dramatic Story", template: "Imagine an avatar that represents all of the stories, fears, and desires in the text below. Write a dramatic story that feels like the exposition to a young-adults novel. The story should evoke a sense of dread and hopelessness in solving the individuals problems. Give the character a name you think suits them best. Notes: "}
]

export default synthesizePrompts;
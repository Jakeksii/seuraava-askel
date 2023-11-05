


// function that updates a value, that starts from 0


const incrementClicks = async (): Promise<void> => {

  try {
    // Step 1: Fetch the current count from the database
    const response = await fetch('http://localhost:3001/api/statistics/:id');
    if (!response.ok) {
      console.error('Failed to fetch current count from the database');
      return;
    }

    const currentCount = await response.json();

    // Step 2: Increment the count
    const updatedCount = currentCount + 1;

    // Step 3: Update the database with the new count
    const updateResponse = await fetch('your-api-endpoint-to-update-count', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ count: updatedCount }),
    });

    if (!updateResponse.ok) {
      console.error('Failed to update count in the database');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export default incrementClicks;
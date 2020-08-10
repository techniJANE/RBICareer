let responses = [];
const userResponsesSection = document.querySelector('#user-responses');

const fetchUserResponses = async () => {
  const response = await fetch(
    'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vSsUrVeGAQj3bCjv9D3HV89Ed2RAwyE1mX2KR7SiTgbWXD_bsYQ7LHLpkR97_phmrnyAWMyFdwCpG79/pub?output=csv'
  );
  const data = await response.text();
  const results = Papa.parse(data, { header: true });
  responses = results.data;
};

// Upload a funny picture of yourself!: "https://drive.google.com/open?id=1BZIf7RGVV-ParWx7P6YKEnv1KqmCdwcC"

const renderUserResponse = userResponse => {
  const name = userResponse['What is your first and last name?'];
  const picture = userResponse['Upload a funny picture of yourself!'];
  const currentPosition = userResponse['What is your current position?'];
  const currentDepartment =
    userResponse['Which department do you currently work in?'];
  const currentCountry =
    userResponse['Which country do you currently work in?'];
  const currentBrand = userResponse['What brand(s) do you currently work for?'];
  const futureCountry =
    userResponse[
      'If you could choose, where would you be interested to live in? (you can pick multiple locations)'
    ];
  const futureDepartment =
    userResponse[
      'In the future, which department(s) would you be interested in? '
    ];
  const googlePhotoId = picture.split('id=')[1];
  console.log(googlePhotoId);
  return `
  <div class="user-response">
  <h2>${name}</h2>
  <img src="https://drive.google.com/thumbnail?id=${googlePhotoId}" alt="funny-picture"/>
  <h3>Position: ${currentPosition}</h3>
  <h3>Dept: ${currentDepartment}</h3>
  <h3>${currentBrand} ${currentCountry}<h3>
  <p>In the future, I would be happy to work in ${futureDepartment}, and would love to explore the option of working in: ${futureCountry}.</p>
  </div>
  `;
};

const fetchAndShowResponses = async () => {
  await fetchUserResponses();
  const eachUserResponseHTML = responses.map(renderUserResponse);
  const allUserResponsesHTML = eachUserResponseHTML.join('');
  userResponsesSection.innerHTML = allUserResponsesHTML;
};

fetchAndShowResponses();

const countrySelect = document.querySelector('#country');
const brandSelect = document.querySelector('#brand');
const searchInput = document.querySelector('#search');

const responseFilter = response => {
  const selectedCountry = countrySelect.value;
  const selectedBrand = brandSelect.value;
  const searchTerm = searchInput.value.toLowerCase();

  return (
    (selectedCountry === 'all' || response.country === selectedCountry) &&
    (selectedBrand === 'all' || response.brand === selectedBrand) &&
    (response.name.toLowerCase().includes(searchTerm) ||
      response.currentPosition.toLowerCase.includes(searchTerm) ||
      response.currentDepartment.toLowerCase.includes(searchTerm) ||
      response.futureDepartment.toLowerCase.includes(searchTerm) ||
      response.futureCountry.toLowerCase.includes(searchTerm))
  );
};

const handleFilterInput = () => {
  const filteredResponses = responses.filter(responseFilter);
  main.innerHTML = filteredResponses.map(renderUserResponse).join('');
};

countrySelect.addEventListener('input', handleFilterInput);
brandSelect.addEventListener('input', handleFilterInput);
searchInput.addEventListener('input', handleFilterInput);

const question = 'Which country do you currently work in?';

const votes = {
  "🇨🇦": 0;
  "🇺🇸": 0;
}

responses.forEach(response => {
  votes[response[question]]+= 1
})

🇨🇦Span.textContent = votes ["🇨🇦"];
🇺🇸Span.textContent = votes ["🇺🇸"];

new Chart("pie-chart", {
  type: 'pie',
  data: {
    datasets: [{
      data: Object.values(votes),
      backgroundColor: ["whitesmoke", "salmon", "grey"]
    }],
    labels: Object.keys(votes)
  }
})
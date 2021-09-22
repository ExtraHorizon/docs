# Localization Service



## Localization Service

The Extra Horizon Localization Service manages storage and retrieval of text snippets translated into multiple languages. This guide provides a conceptual overview of the Localization Service and is complementary to the API reference documentation.

### About the Localization Service

The Localization Service provides a database to store text snippets in multiple languages that can be retrieved on demand by using a “localization key”. The Template and Notification Services use these keys in their messages to automatically provide the text in the user’s preferred language. 

<table>
  <thead>
    <tr>
      <th style="text-align:left">
        <p>Example</p>
        <p>
          <img src="https://lh4.googleusercontent.com/EoWe1p3noBGRp59m4J3OAroSDkfsbbAwPolDy5lZO3WQ1fxyetCwLsxgD4YlUJeY_i961KNuxuTIOdmo_RFq_Wq3vZPOvTD4XG4uT4Xi4GQ_sXT6hHddHhO9qU1By1mETyWHjLY=s0"
          alt/>
        </p>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

### Objects and attributes

#### LocalizationSets

Text snippets are stored in a LocalizationSet object, which is uniquely identified by its key attribute. The translations and their respective language codes \(ISO 639-1\) are stored as key-value pairs in the text attribute. 

![](https://lh4.googleusercontent.com/PEylWnecR8M3PCNVN-uVAg6VsQOitznySjo2DZShgoka-qxK3Q4Q-6XGbnxsrBWNI3a1wpJH7t3ctwX83GdHB31tyC5ZZ46wNvuGCHNBB67le81Y_4B1avp-hJIYbDm6XTm4wYE=s0)

#### Common timestamp attributes

All Extra Horizon Services keep track of the time of creation \(creationTimestamp\) and of the most recent update \(updateTimestamp\) of their stored objects.

| Note: The timestamp attributes in the Localization Service have a number format, whereas other Services use a string\($date-time\) format. |
| :--- |


### Actions

This section gives an overview of the available Localization Service endpoints. The full descriptions, including the required permissions and/or scopes, can be found in the API reference documentation.

#### Managing LocalizationSets

The four CRUD actions are available to set up LocalizationSets. The {languageCode: string} pairs in a set can be updated but cannot be removed individually. 

* Create LocalizationSet\(s\): POST /
* List all LocalizationSets: GET /
* Update LocalizationSet\(s\): PUT /
* Delete LocalizationSet\(s\): DELETE /

#### Using LocalizationSets

References to LocalizationSets can be made in the Template and Notification Services by using double curly brackets: {{key}}. The Services will then communicate with each other to provide the text snippet in the user’s preferred language, if available. If not, the default text is returned, i.e. the English version. 

Text snippets in one or more languages can also be requested directly from the Localization Service with the following endpoint:

* List LocalizationSet text\(s\) in specific language\(s\): POST /request

| Tip: The order of words in a sentence can differ between languages due to their unique set of grammar rules. The Localization Service accepts multiple arguments that can be used to resolve variables in the text snippets. The order of appearance dictates the variable name in the snippet: $1, $2, etc.  |
| :--- |


<table>
  <thead>
    <tr>
      <th style="text-align:left">Example</th>
      <th style="text-align:left"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">LocalizationSet
        <br />
      </td>
      <td style="text-align:left">
        <p>&quot;key&quot;: &quot; age_requirement&quot;,</p>
        <p>&quot;text&quot;: {&quot;EN&quot;: &quot;For individuals above the age
          of $1&quot;,</p>
        <p>&quot;NL&quot;: &quot;Voor personen ouder dan $1 jaar&#x201D;}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">Template-based message</td>
      <td style="text-align:left">&quot;message&quot;: &quot;{{age_requirement,16}}&quot;</td>
    </tr>
    <tr>
      <td style="text-align:left">Request body</td>
      <td style="text-align:left">
        <p>&quot;localization_codes&quot;: [&quot;NL&quot;],</p>
        <p>&quot;localizations&quot;: [&quot;age_requirement,16&quot;]</p>
      </td>
    </tr>
  </tbody>
</table>

#### Deprecated Actions \(For internal developers\)

Country and region codes \(ISO 3166 nomenclature\) are no longer used by this service. The endpoint to retrieve language codes only returns the languages supported by Fibricheck, i.e. DA, DE, EN, ES, FR, IT, and NL.

* List all country codes: GET /countries
* List all regions for a country code: GET /countries/{country}/regions
* List all supported language codes: GET /languages


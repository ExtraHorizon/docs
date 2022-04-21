{{- range sort .Site.RegularPages ".Params.date" "desc"}}
## {{ (index .Site.Params.services .Params.service).name }} {{ .Params.version }} ({{ .Params.date.Format "2006-01-02" }})
[Documentation]({{ (index .Site.Params.services .Params.service).docsUrl }}) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/{{ .Params.service }}/{{ .Params.version }}/openapi.yaml)

<details>
<summary>Release Notes</summary>
{{ .RawContent }}
</details>

{{ end }}
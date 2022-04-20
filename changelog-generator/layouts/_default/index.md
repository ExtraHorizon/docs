{{- range $key, $value := .Site.Params.services -}}
{{- $changelogs := (where site.RegularPages ".Params.service" $key) -}}
{{- if gt (len $changelogs) 0 }}
## {{ $value.name }}
{{ range where site.RegularPages ".Params.service" $key }}
### {{ .Params.version }} ({{ .Params.date.Format "2006-01-02" }})
[Documentation]({{ (index .Site.Params.services .Params.service).docsUrl }}) • [API Reference](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/{{ .Params.service }}/{{ .Params.version }}/openapi.yaml)
<details>
<summary>Detailed Release Notes</summary>
{{ .RawContent }}
</details>

{{ end -}}
{{- end -}}
{{- end -}}
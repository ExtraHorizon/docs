| Service | Base Path | Version | Older Versions |
| ----| ---- | ---- | ---- |
{{ range $key, $value := .Site.Params.services -}}
{{- $.Scratch.Set "version" $value.defaultVersion -}}
{{- range first 1 (where site.RegularPages ".Params.service" $key) -}}
{{- $.Scratch.Set "version" .Params.version -}}
{{- end -}}

{{- $version := $.Scratch.Get "version" -}}
| {{ $value.name }} | `{{ $value.basePath}}` | [{{$version}}](https://swagger.extrahorizon.com/swagger-ui/index.html?url=https://swagger.extrahorizon.com/{{ $key }}/{{ $version }}/openapi.yaml) | [older versions](https://swagger.extrahorizon.com/listing/?service={{$key}}) |
{{ end }}
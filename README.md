# Facil Tarot

## Plugin de Wordpress para el barajeo de cartas de tarot

## Instalación


Bajar los archivos en un .zip y luego subirlo al administrador de plugins de Wordpress.

### Activación

Para poder activar el plugin solo hay que darle en activar y para mostrarlo en algún sitio del wordpress, se debe usar el siguiente shortcode:

```bash
[facil_tarot]
```

Para mostrar las tiradas especificas de "X" determinado número de cartas es necesario colocar el plugin de esta manera:
````bash
[facil_tarot num_card=NUM id_page=ID]
````

Donde ````num_card```` va a ser el número de cartas a tirar e ````id_page```` va a ser igual a la página de resultados a donde se va a redirigir cuando se seleccione "X" número determinado de cartas.

Es más recomendable usar el shortcode en alguna página del tipo full-width, pero no en otras páginas o secciones que sean menos de 500px de ancho.

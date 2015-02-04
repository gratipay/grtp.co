{% spaceless %}
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     width="{{ width }}" height="{{ height }}"
     viewBox="{{ '0 0 ' + width + ' ' + height }}">

    {% block svg %}{% endblock %}

</svg>
{% endspaceless %}

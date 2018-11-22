---
---
{% assign collections = '' | split: ' ' %}{% for collection in site.collections %}{% assign collections = collections | push: collection.label %}{% endfor %}
window.lunrStore = {
{% for collection in site.collections %}{% if collection.docs.size != 0 %}{% for post in collection.docs %}{% capture preview %}
  <div class="{% include filter-tags.html post=post %}">
    <input type="radio" id="flipcard_position_{{ post.url | slugify: 'default' }}" name="flipcard_position" value="{{ post.url }}" class="flipcard-position d-none" data-storage="false" />
    <div class="card card-flip m-1">
      {% if post.weight > 0 %}{% assign class = 'card-position-absolute bg-primary text-white' %}{% else %}{% assign class = 'card-position-absolute bg-white' %}{% endif %}
      {% include card.html face="front" post=post class=class img-class="card-img-faded card-img-grayscale" title-class="h2 font-weight-bold" %}
      {% include card.html face="back" post=post class="bg-white text-dark" %}
    </div>
  </div>{% endcapture %}
  {{ post.url | jsonify }}: {
    "preview": {{ preview | strip_newlines | normalize_whitespace | jsonify }}
  }{% unless forloop.last %},{% endunless %}{% endfor %}{% unless forloop.last %},{% endunless %}{% endif %}{% endfor %}

{% if site.pages.size != 0 %}{% for post in site.pages %}{% if post.title %}{% capture preview %}
  <div class="{% include filter-tags.html post=post %}">
    <input type="radio" id="flipcard_position_{{ post.url | slugify: 'default' }}" name="flipcard_position" value="{{ post.url }}" class="flipcard-position d-none" data-storage="false" />
    <div class="card card-flip m-1">
      {% if post.weight > 0 %}{% assign class = 'bg-primary text-white' %}{% else %}{% assign class = 'bg-dark text-white' %}{% endif %}
      {% include card.html face="front" post=post class="card-position-absolute" img-class="card-img-faded card-img-grayscale" title-class="h2 font-weight-bold" %}
      {% include card.html face="back" post=post class="bg-white text-dark" %}
    </div>
  </div>{% endcapture %}
  {{ post.url | jsonify }}: {
    "preview": {{ preview | strip_newlines | normalize_whitespace | jsonify }}
  }{% unless forloop.last %},{% endunless %}{% endif %}{% endfor %}{% endif %}
};

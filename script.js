// script.js - builds treemap using d3, provides zoom/pan, search and modal details

// compute width/height from container
function getVisSize(){
  const el = document.querySelector('.vis');
  return { width: Math.max(300, el.clientWidth), height: Math.max(200, el.clientHeight) };
}

let { width, height } = getVisSize();

// Create svg container
const svg = d3.select('#vis').append('svg')
  .attr('width', '100%')
  .attr('height', '100%')
  .attr('viewBox', `0 0 ${width} ${height}`)
  .style('cursor', 'grab');

const g = svg.append('g');

// Color scale - categorical
const color = d3.scaleOrdinal(d3.schemeTableau10);

// Create root from data: sum values (leaf nodes) and sort
const root = d3.hierarchy(data).sum(d => d.value ? d.value : 0).sort((a,b) => b.value - a.value);

// Treemap layout
d3.treemap().size([width, height]).paddingInner(6)(root);

// Draw nodes
const nodes = g.selectAll('g.node').data(root.descendants()).enter().append('g')
  .attr('class','node')
  .attr('transform', d => `translate(${d.x0},${d.y0})`)
  .on('dblclick', (e,d)=> openModal(d.data))
  .on('click', (e,d)=> focusOn(d));

nodes.append('rect')
  .attr('width', d => Math.max(0, d.x1 - d.x0))
  .attr('height', d => Math.max(0, d.y1 - d.y0))
  .attr('rx', 8)
  .attr('ry', 8)
  .style('fill', d => d.depth === 0 ? '#071425' : color(d.parent ? d.parent.data.name : d.data.name))
  .style('mix-blend-mode','screen');

nodes.append('foreignObject')
  .attr('width', d => Math.max(0, d.x1 - d.x0) - 8)
  .attr('height', d => Math.max(0, d.y1 - d.y0) - 8)
  .attr('x',4).attr('y',4)
  .append('xhtml:div')
  .attr('class','node-content')
  .style('width','100%').style('height','100%')
  .html(d => `<div class="label">${d.data.name}</div><div class="value">${d.value ? d.value : ''}</div>`);

// Zoom and pan with d3 zoom
const zoom = d3.zoom()
  .scaleExtent([0.6, 4])
  .on('zoom', (event) => g.attr('transform', event.transform));

svg.call(zoom);

// Focus on node: center & zoom to fit
function focusOn(d){
  // If leaf with zero size, do nothing
  const dx = Math.max(1, d.x1 - d.x0);
  const dy = Math.max(1, d.y1 - d.y0);
  const kx = width / dx;
  const ky = height / dy;
  const k = Math.min(kx, ky) * 0.85;
  const tx = - (d.x0 + d.x1)/2 * k + width/2;
  const ty = - (d.y0 + d.y1)/2 * k + height/2;
  svg.transition().duration(650).call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(k));
}

// Reset view button
document.getElementById('resetView').addEventListener('click', ()=> {
  svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity);
});

// Search: find first matching node and focus
document.getElementById('search').addEventListener('keydown', (e)=>{
  if(e.key === 'Enter'){
    const q = e.target.value.trim().toLowerCase();
    if(!q) return;
    const match = root.descendants().find(n => n.data.name && n.data.name.toLowerCase().includes(q));
    if(match) focusOn(match);
  }
});

// Modal behavior
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalLinks = document.getElementById('modalLinks');
const modalClose = document.getElementById('modalClose');

function openModal(d){
  if(!d) return;
  modalTitle.textContent = d.name || d.title || 'Details';
  modalDesc.textContent = d.desc || d.description || 'No description provided.';
  modalLinks.innerHTML = '';
  if(d.links && d.links.length){
    const ul = document.createElement('ul');
    d.links.forEach(l => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${l}" target="_blank" rel="noopener">${l}</a>`;
      ul.appendChild(li);
    });
    modalLinks.appendChild(ul);
  }
  modal.setAttribute('aria-hidden','false');
}
modalClose.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));

// Double-click background to reset
svg.on('dblclick', () => svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity));

// Responsive: update viewBox and treemap on resize
window.addEventListener('resize', ()=> {
  const size = getVisSize();
  width = size.width; height = size.height;
  svg.attr('viewBox', `0 0 ${width} ${height}`);
  // recompute layout and positions
  d3.treemap().size([width, height]).paddingInner(6)(root);
  nodes.data(root.descendants())
    .attr('transform', d => `translate(${d.x0},${d.y0})`)
    .select('rect')
      .attr('width', d => Math.max(0, d.x1 - d.x0))
      .attr('height', d => Math.max(0, d.y1 - d.y0));
  nodes.select('foreignObject')
      .attr('width', d => Math.max(0, d.x1 - d.x0) - 8)
      .attr('height', d => Math.max(0, d.y1 - d.y0) - 8);
});

// Accessibility shortcuts
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') modal.setAttribute('aria-hidden','true');
  if(e.key === 'f') document.getElementById('search').focus();
});

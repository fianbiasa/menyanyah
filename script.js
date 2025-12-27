// YouTube API Integration for Menyanyah Podcast

// Channel Configuration
const CHANNEL_USERNAME = 'menyanyahpodcast';
const MAX_RESULTS = 12; // Number of videos to fetch per page

// API endpoints
const API_BASE = 'https://www.googleapis.com/youtube/v3';

// State management
let nextPageToken = null;
let isLoading = false;

// Format numbers with K, M notation
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Format duration from ISO 8601 to readable format
function formatDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');
    
    if (hours) {
        return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }
    return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
}

// Format date to readable format
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

// Get channel ID from username
async function getChannelId() {
    try {
        const url = `${API_BASE}/channels?part=id,statistics&forUsername=${CHANNEL_USERNAME}&key=${YOUTUBE_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            return {
                channelId: data.items[0].id,
                statistics: data.items[0].statistics
            };
        }
        
        // If username doesn't work, try with handle (newer YouTube format)
        const handleUrl = `${API_BASE}/search?part=snippet&type=channel&q=@${CHANNEL_USERNAME}&key=${YOUTUBE_API_KEY}`;
        const handleResponse = await fetch(handleUrl);
        const handleData = await handleResponse.json();
        
        if (handleData.items && handleData.items.length > 0) {
            const channelId = handleData.items[0].snippet.channelId;
            
            // Get statistics for this channel
            const statsUrl = `${API_BASE}/channels?part=statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`;
            const statsResponse = await fetch(statsUrl);
            const statsData = await statsResponse.json();
            
            return {
                channelId: channelId,
                statistics: statsData.items[0].statistics
            };
        }
        
        throw new Error('Channel tidak ditemukan');
    } catch (error) {
        console.error('Error getting channel ID:', error);
        throw error;
    }
}

// Fetch videos from YouTube
async function fetchVideos(channelId, pageToken = null) {
    try {
        let url = `${API_BASE}/search?part=snippet&channelId=${channelId}&maxResults=${MAX_RESULTS}&order=date&type=video&key=${YOUTUBE_API_KEY}`;
        
        if (pageToken) {
            url += `&pageToken=${pageToken}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }
        
        // Get video IDs
        const videoIds = data.items.map(item => item.id.videoId).join(',');
        
        // Fetch video details (duration, views, etc.)
        const detailsUrl = `${API_BASE}/videos?part=contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();
        
        // Merge data
        const videos = data.items.map(item => {
            const details = detailsData.items.find(d => d.id === item.id.videoId);
            return {
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.high.url,
                publishedAt: item.snippet.publishedAt,
                duration: details ? details.contentDetails.duration : 'PT0S',
                viewCount: details ? details.statistics.viewCount : 0,
                likeCount: details ? details.statistics.likeCount : 0,
                commentCount: details ? details.statistics.commentCount : 0
            };
        });
        
        return {
            videos: videos,
            nextPageToken: data.nextPageToken
        };
    } catch (error) {
        console.error('Error fetching videos:', error);
        throw error;
    }
}

// Update channel statistics
function updateStatistics(statistics) {
    document.getElementById('total-videos').textContent = formatNumber(parseInt(statistics.videoCount));
    document.getElementById('subscribers').textContent = formatNumber(parseInt(statistics.subscriberCount));
    document.getElementById('views').textContent = formatNumber(parseInt(statistics.viewCount));
}

// Create episode card HTML
function createEpisodeCard(video) {
    return `
        <div class="episode-card" onclick="openVideo('${video.id}')">
            <div class="episode-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="play-overlay">
                    <i class="fas fa-play"></i>
                </div>
                <div class="episode-duration">${formatDuration(video.duration)}</div>
            </div>
            <div class="episode-content">
                <div class="episode-date">${formatDate(video.publishedAt)}</div>
                <h3 class="episode-title">${video.title}</h3>
                <p class="episode-description">${video.description}</p>
                <div class="episode-stats">
                    <div class="episode-stat">
                        <i class="fas fa-eye"></i>
                        <span>${formatNumber(parseInt(video.viewCount))}</span>
                    </div>
                    <div class="episode-stat">
                        <i class="fas fa-thumbs-up"></i>
                        <span>${formatNumber(parseInt(video.likeCount))}</span>
                    </div>
                    <div class="episode-stat">
                        <i class="fas fa-comment"></i>
                        <span>${formatNumber(parseInt(video.commentCount))}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Display episodes
function displayEpisodes(videos, append = false) {
    const grid = document.getElementById('episodes-grid');
    const html = videos.map(video => createEpisodeCard(video)).join('');
    
    if (append) {
        grid.innerHTML += html;
    } else {
        grid.innerHTML = html;
    }
}

// Open video in modal
function openVideo(videoId) {
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('video-player');
    
    // Set video URL with autoplay
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close video modal
function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('video-player');
    
    // Stop video
    player.src = '';
    
    // Hide modal
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Show error message
function showError(message) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'block';
    document.getElementById('error-text').textContent = message;
}

// Hide loading
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Load more episodes
async function loadMoreEpisodes() {
    if (isLoading || !nextPageToken) return;
    
    isLoading = true;
    const loadMoreBtn = document.getElementById('load-more');
    loadMoreBtn.disabled = true;
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    try {
        const channelData = await getChannelId();
        const data = await fetchVideos(channelData.channelId, nextPageToken);
        
        displayEpisodes(data.videos, true);
        nextPageToken = data.nextPageToken;
        
        if (!nextPageToken) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.disabled = false;
            loadMoreBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Load More Episodes';
        }
    } catch (error) {
        showError('Gagal memuat episode tambahan. Silakan coba lagi.');
        loadMoreBtn.disabled = false;
        loadMoreBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Load More Episodes';
    }
    
    isLoading = false;
}

// Initialize the page
async function init() {
    try {
        // Check if API key is configured
        if (typeof YOUTUBE_API_KEY === 'undefined' || !YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE') {
            showError('YouTube API Key belum dikonfigurasi. Silakan lihat README.md untuk panduan setup.');
            return;
        }
        
        // Get channel data
        const channelData = await getChannelId();
        
        // Update statistics
        updateStatistics(channelData.statistics);
        
        // Fetch and display videos
        const data = await fetchVideos(channelData.channelId);
        
        hideLoading();
        displayEpisodes(data.videos);
        
        // Store next page token
        nextPageToken = data.nextPageToken;
        
        // Show load more button if there are more videos
        if (nextPageToken) {
            document.getElementById('load-more').style.display = 'inline-flex';
        }
        
    } catch (error) {
        console.error('Initialization error:', error);
        showError(`Error: ${error.message}. Pastikan YouTube API Key sudah dikonfigurasi dengan benar.`);
    }
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav__link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Show/hide back to top button
    const backToTop = document.getElementById('back-to-top');
    if (scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Back to top button
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Load more button event
document.getElementById('load-more').addEventListener('click', loadMoreEpisodes);

// Video modal event listeners
document.querySelector('.video-modal__overlay').addEventListener('click', closeVideoModal);
document.querySelector('.video-modal__close').addEventListener('click', closeVideoModal);

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeVideoModal();
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

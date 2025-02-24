/**
 * Telegram Service
 * Handles business logic for Telegram bot operations
 */

const bot = require('../config/telegramBot');

class TelegramService {
  /**
   * Send a message to a specific chat
   * @param {string} chatId - The ID of the chat to send the message to
   * @param {string} message - The message to send
   * @returns {Promise<Object>} The result of the send operation
   */
  async sendMessage(chatId, message) {
    try {
      const result = await bot.sendMessage(chatId, message);
      return {
        success: true,
        messageId: result.message_id
      };
    } catch (error) {
      console.error('Error in sendMessage:', error);
      throw error;
    }
  }

  /**
   * Process an incoming update from Telegram
   * @param {Object} update - The update object from Telegram
   */
  async processUpdate(update) {
    try {
      // TODO: Implement custom logic for processing updates
      console.log('Received update:', update);
      
      if (update.message) {
        const chatId = update.message.chat.id;
        const text = update.message.text;
        
        // Example: Echo the received message
        await this.sendMessage(chatId, `You said: ${text}`);
      }
    } catch (error) {
      console.error('Error in processUpdate:', error);
      // Don't throw here, as this is called by the webhook
    }
  }
}

module.exports = new TelegramService();
